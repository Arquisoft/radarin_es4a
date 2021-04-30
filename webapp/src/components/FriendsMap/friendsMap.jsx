import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
import { usePosition } from "use-position";
import { successToaster } from "@utils";
import { getText } from "../../i18n";
//import Notifications from "../../containers/Notifications/NotificationHelper";

//import solid from "@solid/query-ldflex";

import { useWebId } from  "@solid/react";
import { useLDflexList } from "@solid/react";
import axios from "axios"; 

//import "./friendsMap.css"

const notificado = new Map();

const Marker = (props) => (
  <div style={{
    color: "white", 
    background: props.color,
    padding: "15px 15px",
    display: "inline-flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    transform: "translate(-50%, -50%)"
  }}>
    {props.text}
  </div>
);

/*
const Circle = (props) => (
  <div style={{
    color: "red", 
    background: props.color,
    padding: "15px 15px",
    display: "inline-flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "100%",
    transform: "translate(-50%, -50%)"
  }}>
    {props.text}
  </div>
);
*/

const radius = () => {
  if (window.sessionStorage.getItem("radius") != null) {
      return window.sessionStorage.getItem("radius").valueOf();
  }
  else {
      window.sessionStorage.setItem("radius", "5");
  }
  return window.sessionStorage.getItem("radius").valueOf();
};

//console.log(radius());

/*
async function getUserWebID () {
  const user = solid.data.user;
  const webID = await user;
  return webID;
}
*/

async function getFriends( friends ) {
  const friendsValue = await friends;
  return friendsValue;
}

// Auxiliar method to convert coords to radians.
var toRadianes = function (valor) {
  return (Math.PI / 180) * valor;
}
// Calculates the distance between two coordinates according to Haversine Formule.
var distanceFilter = function (lat2, lng2, userLat, userLon) {
  var RadioTierraKm = 6378.0;

  var lat1 = userLat;
  var lng1 = userLon;
  var difLat = toRadianes(lat2 - lat1);
  var difLng = toRadianes(lng2 - lng1);

  var a = Math.pow(Math.sin(difLat / 2), 2) +
      Math.cos(toRadianes(lat1)) *
      Math.cos(toRadianes(lat2)) *
      Math.pow(Math.sin(difLng / 2), 2);

  var c = RadioTierraKm * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));

  if (c > radius()) {
      return false;
  }

  return true;
}

// Use React.Memo
function FriendsMap( props ) {
  const [userFriendsList, setUserFriendsList] = useState( [] );
  //const [serverResponse, setServerResponse] = useState( {} );
  //const [userWebID, setUserWebID] = useState( useWebId() );
  const [lista, setLista] = useState( {} );

  const tempFriendsList = [];
  const webID = useWebId();

  const { latitude, longitude } = usePosition( false );

  getFriends(useLDflexList( "[" + webID + "].friends" ))
        .then( (friendsList) => { if (friendsList!==userFriendsList) setUserFriendsList( friendsList ) });


    //Metemos esto en una función para que no se ejecute todo el rato
    function prueba(){
      userFriendsList.forEach((element) => {
        tempFriendsList.push( element.valueOf() );
        if (!notificado.has(element.valueOf())) {
          notificado.set(element.valueOf(), false);
        }
      });

      let userInfo = { 
        "webid": webID,
        "data": {
          "friends": tempFriendsList, 
          "last_location": {
            "lat": latitude, 
            "lon": longitude, 
            "timestamp": Date.now() 
          }
        }
      }
    
      if (tempFriendsList.length > 0 ){
        const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
        axios.post( apiEndPoint + "/users/update", userInfo )
            .then((res) => { setLista(res.data) }); //Usamos el setState y metemos la lista que luego usaremos con setList
      }
    }

    useEffect(() => {
      setTimeout(prueba, 1000);
    });


  return (
    <div style={{ height: "90vh", width: "100%" }}>
      <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY" }}
      center={{lat: latitude, lng: longitude}}
      defaultZoom={(radius()<=8) ? Math.round(15-(radius()*0.4)) : (radius()<20) ? Math.round(15-(radius()*0.3)) : Math.round(15-(radius()*0.18)) }
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={({map, maps}) =>
      {
        new maps.Circle({
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.3,
          map,
          center: {lat: latitude, lng: longitude},
          radius: radius()*1000,
        });
      }}
        >
       <Marker lat={ latitude } lng={ longitude } color="blue" text={getText("map.you")}/>

       { Object.keys(lista).map( (amigo) => {
          if(distanceFilter(lista[amigo].lat, lista[amigo].lon, latitude, longitude)) {
            if (!notificado.get(amigo)) {
              successToaster(amigo.split("/")[2].split(".")[0] + getText("map.near"), "SUCCESS");
              notificado.set(amigo, true);
            }
            return (
              <Marker lat={ lista[amigo].lat } lng={ lista[amigo].lon } color="green" text={ amigo.split("/")[2].split(".")[0] } />
            );
          }
          else {
            notificado.set(amigo, false);
            return null;
          }
       })}
      
       
    </GoogleMapReact> 
    </div>
  );
}

export default FriendsMap;