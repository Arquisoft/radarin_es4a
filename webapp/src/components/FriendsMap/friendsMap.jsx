import React, { useEffect, useState } from "react";
import GoogleMapReact from 'google-map-react';
import { usePosition } from 'use-position';

import { useWebId, List } from  '@solid/react';
import { useLDflexValue, useLDflexList } from '@solid/react';
import axios from 'axios'; 

//import './friendsMap.css'

const Marker = ({ text }) => (
  <div style={{
    color: 'white', 
    background: 'grey',
    padding: '15px 15px',
    display: 'inline-flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '100%',
    transform: 'translate(-50%, -50%)'
  }}>
    {text}
  </div>
);

// Use React.Memo
function FriendsMap( props ) {
  const [userFriendsList, setUserFriendsList] = useState( [] );
  const [serverResponse, setServerResponse] = useState( {} );
  const [userWebID, setUserWebID] = useState( useWebId() );

  const { latitude, longitude } = usePosition( false );
  
  const fetchedList = useLDflexList('user.friends');

  useEffect(() => {
    let friend_list = [];
    fetchedList.forEach(item => friend_list.push( item.toString() ) );
    setUserFriendsList( friend_list );
  }, []);

  console.log( userWebID );
  
  let userInfo = { 
    "webid": userWebID,
    "data": {
      "friends": userFriendsList, 
      "last_location": {
        "lat": latitude, 
        "lon": longitude, 
        "timestamp": Date.now() 
      }
    }
  }

  useEffect(() => {
    // URL de prueba
    fetch( 'https://a661ffc8a0b6903e4b6821c7ec99ac9d.m.pipedream.net', {
      method: "POST", 
      body: JSON.stringify( userInfo )
    
    }).then(res => { console.log("Request complete! response:", res.body) });
  }, []);

  return (
    <div style={{ height: '80vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCoW1RuwmBwVJTgNm9u3ruBf_oMJGnLckY" }}
        center={ { lat: latitude, lng: longitude } }
        defaultZoom={ 15 }>
          
          <Marker 
          // @ts-ignore
          lat={ latitude } lng={ longitude } text="Tú" />

      </GoogleMapReact>
    </div>
  );
}

export default FriendsMap;