import React, { useEffect, useState } from "react";
import { NotificationTypes, useNotification } from "@inrupt/solid-react-components";
import { notification } from "@utils";
import auth from "solid-auth-client";
import { FriendsList } from "../MyFriends/myfriends.style";
import { List } from "@solid/react";
import { getUrl, getUserName } from "../MyFriends/myFriends.component";
import { sharing } from "../../utils/permissions";
import { Modal, Button } from "react-bootstrap";
import i18n from "i18n";

const Notifications = ({show, setshow }) => {
	let cadena = null;

	const { createNotification } = useNotification(cadena);

	//useEffect(() => {
	//	auth.trackSession((session) => {
	//		if (session) {
				cadena = "https://uo271397.inrupt.net/profile/card#me";
	//		}
	//	});
	//});

	async function sendNotification(content, to, type, license) {
		try {
			await createNotification(content, to, type, license);
		} catch (error) {
			alert("Error: sendNotification error");
		}
	}

	function showNotifications(friendWebId, e) { // Igual falta el object aquí
		e.preventDefault();
		try {
			const contentNotif = {
				title: "Prueba notificación",
				summary: getUserName(cadena) + " ha compartido su notificación contigo",
				actor: cadena,
				target: friendWebId
			};
            
			publish(sendNotification, contentNotif, friendWebId, NotificationTypes.OFFER);
		} catch (error) {
			alert("Could not share the route");
		}
	}

	const publish = async (createNotification, content, webId, type) => {
		try {
			type = type || NotificationTypes.ANNOUNCE;

			const license = "https://creativecommons.org/licenses/by-sa/4.0/";

			const inboxes = await notification.findUserInboxes([ { path: webId, name: "Global" } ]);
			if (inboxes.length === 0) {
				return false;
			}
			const to = notification.getDefaultInbox(inboxes, "Global");
			if (to) {
				await createNotification(
					{
						title: content.title,
						summary: content.summary,
						actor: content.actor,
						target: content.target
					},
					to.path,
					type,
					license
				);
			}
			return true;
		} catch (e) {
			return false;
		}
	};

	function shareWithFriends(e) {
		e.preventDefault();
        
		//for (var [ key ] of checkedItems) {
			showNotifications(cadena, e);
		//}
		//givePermissions(checkedItems);
		setshow(!show);
	}

	//function givePermissions() {
	//	let nameRoute = getUrl(cadena) + "private/viade/routes/" + ruta + ".ttl";
	//	sharing(cadena, checkedItems, nameRoute);
	//}

	return (

				<button id="shareRoute" onClick={(e) => shareWithFriends(e)}>
					BotónNotificación
				</button>

	);
};

export default Notifications;