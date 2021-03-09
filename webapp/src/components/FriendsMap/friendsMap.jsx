import React from 'react'
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

import './friendsMap.css'

const LocationPin = ({ text }) => (
  <div className="pin">
    <Icon icon={locationIcon} className="pin-icon" />
    <p className="pin-text">{text}</p>
  </div>
)

const coordinates = {
  lat: 59.955413,
  lng: 30.337844
};

class FriendsMap extends React.Component {
  static defaultProps = {
    center: {
      lat: coordinates.lat,
      lng: coordinates.lng
    },
    zoom: 10
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function(position) {
      coordinates.lat = position.coords.latitude;
      coordinates.lng = position.coords.longitude;
    });
  }

  render() {
    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyDgbW_ScqYdmd8fQL7TKoOU4MCtAfvXOgo' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <LocationPin
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default FriendsMap