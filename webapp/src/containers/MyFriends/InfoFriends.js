import React from "react";
import { RouteCard } from "./myfriends.style";
import  Notifications from "../Notifications/NotificationHelper";
import { getText } from "../../i18n";

const InfoFriends = (props) => {
	const { name, webidFriend} = props;

	return (
		<RouteCard className="card">
			<div id="itemAmigo">
					<h3 data-testid="friendId">{name}</h3>
                    <h3 data-testid="friendweb">{webidFriend}</h3>
					<Notifications mensaje={getText("myFriends.hang.message")} nombreBoton={getText("myFriends.hang.hang")} amigos={[webidFriend]} toastermsg={getText("myFriends.hang.toast")}/>		
            </div>          
		</RouteCard>
	);
};

export default InfoFriends;