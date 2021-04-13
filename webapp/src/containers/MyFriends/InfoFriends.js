import React from "react";
import { RouteCard } from "./myfriends.style";
import  Notifications from "../Notifications/NotificationHelper";

const InfoFriends = (props) => {
	const { name, webidFriend} = props;

	return (
		<RouteCard className="card">
			<div id="itemAmigo">
					<h3 data-testid="friendId">{name}</h3>
                    <h3 data-testid="friendweb">{webidFriend}</h3>
					<Notifications mensaje=" quiere quedar contigo." nombreBoton="Quedar" amigos={[webidFriend]} toastermsg="Amigo notificado con éxito"/>		
            </div>          
		</RouteCard>
	);
};

export default InfoFriends;