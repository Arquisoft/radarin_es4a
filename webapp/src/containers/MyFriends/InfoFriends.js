import React from "react";
import { RouteCard } from "./myfriends.style";
import  Notifications from "../Notifications/NotificationHelper";
import { getText } from "../../i18n";
import { Button } from "react-bootstrap";
import { deleteFriend } from "./friends.service";
import { useWebId } from  "@solid/react";

const InfoFriends = (props) => {
	const { name, webidFriend} = props;
	const webID = useWebId();

	return (
		<RouteCard className="card">
			<div id="itemAmigo">
					<h3 data-testid="friendId">{name}</h3>
                    <h3 data-testid="friendweb">{webidFriend}</h3>
					<Notifications mensaje={getText("myFriends.hang.message")} nombreBoton={getText("myFriends.hang.hang")} amigos={[webidFriend]} toastermsg={getText("myFriends.hang.toast")}/>

					<Button variant="outline-primary" onClick={() => deleteFriend(webidFriend,webID)}>  {getText("myFriends.delete")}
				</Button>
			</div>
		</RouteCard>
	);
};

export default InfoFriends;
