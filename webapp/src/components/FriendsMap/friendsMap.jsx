import React from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
import {useWebId, List} from  '@solid/react';
import { useLDflexValue, useLDflexList } from '@solid/react';
import axios from 'axios'; 

//import './friendsMap.css'

export class FriendsMap extends React.Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true, webId: "", friendUserList: [] };

  componentDidMount(props) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        this.setState({
          userLocation: { lat: latitude, lng: longitude },
          loading: false
        });
      },
      () => {
        this.setState({ loading: false });
      }
    );
    //const friends = useLDflexList('user.friends');
    this.guardarUbicacionUsuarioEnBBDD(this.state.userLocation.lat,this.state.userLocation.lng);
  }

  guardarUbicacionUsuarioEnBBDD(latitudeUser, longitudeUser){
    var infoUser = 
    {
      "webid" : useWebId(), 
      "data" : { 
          "friends" : <List src="user.friends"></List>, 
          "last_location": {
              "lat": latitudeUser, 
              "lon": longitudeUser, 
              "timestamp" : Date.now()
          } 
      } 
  }
  axios.post(`https://localhost:8888`, infoUser).then(res => {console.log(res);console.log(res.data);})
  }

  
  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return (
      <Map google={google} initialCenter={userLocation} zoom={15} style={{ height: '70%' }} >
        <Marker
          id={1}
          title={'La posición del usuario.'}
          name={'User'}
          position={{lat: userLocation.lat, lng: userLocation.lng}} />
      </Map>
      );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY"
})(FriendsMap);