import React from 'react'
import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";

import './friendsMap.css'

export class FriendsMap extends React.Component {
  state = { userLocation: { lat: 32, lng: 32 }, loading: true };

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
  }

  render() {
    const { loading, userLocation } = this.state;
    const { google } = this.props;

    if (loading) {
      return null;
    }

    return (
      <Map google={google} initialCenter={userLocation} zoom={15} >
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