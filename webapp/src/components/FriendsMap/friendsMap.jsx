import React from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import {useWebId, List} from  '@solid/react';
import { useLDflexValue, useLDflexList } from '@solid/react';
import axios from 'axios'; 

//import './friendsMap.css'

export function FriendsMap(props) {
  const [userLocation, setUserLocation] = useState( { lat: 32, lng: 32 } );
  const [loading, setLoading] = useState( true );
  const [userFriendsList, setUserFriendsList] = useState( [] );
  const [serverResponse, setServerResponse] = useState( {} );

  // useEffect llama a la función que se le pasa como
  // parámetro cada vez que se modifica alguno de los estados (declarados arriba)
  // dentro del array del final.
  // Como ahora mismo está vacio, solo obtenemos la ubicación del usuario una vez:
  // cuando se crea el componente.
  useEffect(
    // Recibe 2 funciones:
    // - La primera se ejecuta si la ubicación se ha podido 
    //   obtener sin problemas.
    // - La segunda lo hace si hay problemas y por lo tanto
    //   no ha sido posible obtener la ubicación.
    navigator.geolocation.getCurrentPosition( position => { 
        // Extraer los valores de position
        const { latitude, longitude } = position.coords;

        // Actualizar el estado de la ubicación.
        setUserLocation( { lat: latitude, lng: longitude } );

        // Actualizar el estado de carga (ya ha terminado)
        setLoading( false );

      }, () => { /*En caso de error: */ setLoading( false ); }
    ), [] 
    // Si, parece raro eso de poner un array vacio aquí, pero no lo es:
    // https://medium.com/@timtan93/states-and-componentdidmount-in-functional-components-with-hooks-cac5484d22ad
  );

  // Obtener la lista de amigos
  setUserFriendsList( useLDflexList('user.friends').forEach( item => item.value ) );

  // Datos que se van a enviar al servidor
  var userInfo = {
    "webid" : useWebId(), 
    "data": {
      "friends" : userFriendsList,
      "last_location": {
          "lat": userLocation.lat, 
          "lon": userLocation.lng, 
          "timestamp" : Date.now() } } }

  // Enviar datos al servidor (la url es de prueba)
  axios.post( 'https://localhost:8888', userInfo )
    .then( res => {
      // Guardar la respuesta del servidor en un estado
      setServerResponse(res.data);
    }
  );
  
  // Mostrar la vista
  if (loading) { return null; } 
  else { // Si no...
    // ... devolver el mapa!
    return (
      <Map google={ props.google } initialCenter={ userLocation } zoom={ 15 } style={ { height: '70%' } } >
        <Marker
          id={ 1 }
          title={ 'La posición del usuario.' }
          name={ 'User' }
          position={ {lat: userLocation.lat, lng: userLocation.lng} } />
      </Map>
    );
  }
}

export default GoogleApiWrapper ({
  apiKey: "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY"
})(FriendsMap);