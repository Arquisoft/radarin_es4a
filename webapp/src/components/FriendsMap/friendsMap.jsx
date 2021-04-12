import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { usePosition } from 'use-position';

/*
import solid from '@solid/query-ldflex';
*/

import { useWebId } from  '@solid/react';
import { useLDflexList } from '@solid/react';
import axios from 'axios'; 

//import './friendsMap.css'


var amigos = [];

const Marker = (props) => (
  <div style={{
    color: 'white', 
    background: props.color,
    padding: '15px 15px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {props.text}
  </div>
);

const radius = () => {
  if (window.sessionStorage.getItem("radius") != null) {
      return window.sessionStorage.getItem("radius").valueOf();
  }
  else {
      window.sessionStorage.setItem("radius", "5");
  }
  return window.sessionStorage.getItem("radius").valueOf();
};

console.log(radius());

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

// Use React.Memo
function FriendsMap( props ) {
  const [userFriendsList, setUserFriendsList] = useState( [] );

  const tempFriendsList = [];
  const webID = useWebId();

  const { latitude, longitude } = usePosition( false );

  getFriends(useLDflexList( "[" + webID + "].friends" ))
      .then( (friendsList) => { setUserFriendsList( friendsList ) });

  useEffect( () => {
    userFriendsList.forEach(element => tempFriendsList.push( element.valueOf() ) );

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

    const apiEndPoint = process.env.REACT_APP_API_URI || "http://localhost:5000/api";
    if (tempFriendsList.length > 0 ){
      axios.post( apiEndPoint + "/users/update", userInfo )
          .then(res => {console.log("Request complete! response:", res.data ); amigos.push(res.data) });
    }
    
  }, [userFriendsList] );
  
  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY" }}
      center={{lat: latitude, lng: longitude}}
      defaultZoom={15}
      yesIWantToUseGoogleMapApiInternals={true}
      onGoogleApiLoaded={({map, maps}) =>
        new maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.3,
          map,
          center: {lat: latitude, lng: longitude},
          radius: radius()*1000,
        })}
        >
       <Marker lat={ latitude } lng={ longitude } color="blue" text="Tú"/>
    </GoogleMapReact> 
    </div>
  );
}

export default FriendsMap;