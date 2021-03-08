import React, { Component } from 'react';
import { List } from "@solid/react";
import { Button, FormControl, Container} from "react-bootstrap";
import { addFriend } from './friends.service';
class MyFriends extends Component {
    constructor(props) {
        super(props);
        this.state = {
        enteredWebId: "",
        };
    }

    updateFriendWebId = (evt) => { this.setState( {enteredWebId: evt.target.value}); };


    render(){
        return (
            <Container>
            <div>
                <h1>Añadir amigo:</h1>
                <FormControl onChange={this.updateFriendWebId} type="webID" placeholder="Enter webId">
                </FormControl>
            <Button variant="outline-primary"onClick={()=> console.log(this.state.enteredWebId, this.props.webId, this.updateFriendWebId)}>
            </Button>
                <h1>Lista de amigos:</h1>
            {<List src="user.friends">
                
            </List>}
            </div>
            </Container>
        );
    }
}

export default MyFriends;