import React, { Component } from 'react';
import { List } from "@solid/react";
import { Button, FormControl, Container} from "react-bootstrap";
import { addFriend } from './friends.service';
import  InfoFriends from "./InfoFriends";


class MyFriends extends Component {
 
    
    constructor(props) {
        super(props);
        this.state = {
        friends:[],
        enteredWebId: "",
        };
    }
    
    /*    
           
                    */
                    

    render(){
        return (
            <Container>
            <div>
                <h1>Añadir amigo:</h1>
                <FormControl onChange={this.updateFriendWebId} type="webID" placeholder="Enter webId">
                </FormControl>
            <Button variant="outline-primary"onClick={()=> addFriend(this.state.enteredWebId, this.props.webId)}>   
            </Button>
                <h1>Lista de amigos:</h1>

            {<List src="user.friends">
            {(item, i) => (
				<InfoFriends
                    key={i}
				    name={getUserName(`${item}`)}
					webidFriend={`${item}`}
                />
			)}
            </List>
            }
            
            </div>
            </Container>
        );
    }
}
export const getUserName = (name) => {
  let author = name.replace("https://", "");
  author = author.replace(".solid.community/profile/card#me", "");
  author = author.replace(".inrupt.net/profile/card#me", "");
  return author;
};

export const getUrl = (name) => {
	return name.replace("profile/card#me", "");
};

export default MyFriends;