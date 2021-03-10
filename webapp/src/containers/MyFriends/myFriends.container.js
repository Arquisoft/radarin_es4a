import React, { Component } from 'react';
import { List } from "@solid/react";
import {FriendCardComponent} from '../../components/Card/friendCard';

class MyFriends extends Component {


    render(){
        return (
            <div>
            {<List src="user.friends">
              {(friend) => <FriendCardComponent key={`${friend}`} friend={`${friend}`} enable={true}/>}
            </List>}
            </div>
        );
    }
}

export default MyFriends;