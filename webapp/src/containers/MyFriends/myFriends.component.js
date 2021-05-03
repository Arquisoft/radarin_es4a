import React, { Component } from "react";
import { List } from "@solid/react";
import { Button, FormControl, Container} from "react-bootstrap";
import { addFriend } from "./friends.service";
import  InfoFriends from "./InfoFriends";
import  Notifications from "../Notifications/NotificationHelper";
import { getText } from "../../i18n";

class MyFriends extends Component {
   
    constructor(props) {
        
        super(props);
        this.state = {
        friends:[],
        enteredWebId: "",
        };
        //const { t } = useTranslation();
    }
    
    updateFriendWebId = (evt) => { this.setState( {enteredWebId: evt.target.value}); };
    
    render(){
        
        return (
            <Container>
            <div>
                <h1>{getText("myFriends.add")}</h1>
                <FormControl onChange={this.updateFriendWebId} type="webID" placeholder={getText("myFriends.webId")}>
                </FormControl>

            <Button variant="outline-primary" onClick={() => addFriend(this.state.enteredWebId, this.props.webId)}>  {getText("myFriends.send")}
            </Button>
                <h1>{getText("myFriends.list")}</h1>

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

            <Notifications mensaje={getText("myFriends.covid.message")} nombreBoton={getText("myFriends.covid.covid")} toastermsg={getText("myFriends.covid.toast")}/>	
            
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