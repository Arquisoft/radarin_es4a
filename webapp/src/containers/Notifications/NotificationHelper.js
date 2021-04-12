import React, { useEffect } from "react";
import { NotificationTypes, useNotification } from "@inrupt/solid-react-components";
import { notification, errorToaster, successToaster } from "@utils";
import auth from "solid-auth-client";
import { useLDflexList } from "@solid/react";
import { getUserName } from "../MyFriends/myFriends.component";

const Notifications = ({mensaje, nombreBoton, amigos, toastermsg}) => {
	let cadena = null;
	var error = false;

	const { createNotification } = useNotification(cadena);

	const friendsList = useLDflexList("user.friends");

	useEffect(() => {
		auth.trackSession((session) => {
			if (session) {
				cadena = session.webId; 
			}
		});
	});

	async function sendNotification(content, to, type, license) {
		try {
			await createNotification(content, to, type, license);
		} catch (e) {
			error=true;
		}
	}

	function showNotifications(friendWebId, e) {
		e.preventDefault();
		try {
			const contentNotif = {
				title: "Prueba notificación",
				summary: getUserName(cadena) + mensaje,
				actor: cadena
			};
            
			if (!publish(sendNotification, contentNotif, friendWebId, NotificationTypes.OFFER))
				error = true;
		} catch (e) {
			error = true;
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
						actor: content.actor
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
        //var friendsList = ["https://uo271397.inrupt.net/profile/card#me", "https://cuartasfabio.inrupt.net/profile/card#me", "https://israelmnrg.inrupt.net/profile/card#me", "https://alvarofuente.inrupt.net/profile/card#me", "https://vitusuarez.inrupt.net/profile/card#me", "https://uo269871.inrupt.net/profile/card#me", "https://ramonvilafer.inrupt.net/profile/card#me"];
		if(amigos == null) {
			for (var key of friendsList) { 
				showNotifications(key.value, e);
			}
		} else {
			for (var key2 of amigos) { 
				showNotifications(key2, e);
			}
		}
		
		if (error) {
			errorToaster("Notificación no enviada", "ERROR");
		} else {
			if(toastermsg != null) {
				successToaster(toastermsg, "SUCCESS");
			} else {
				successToaster("Notificación enviada con éxito", "SUCCESS");
			}
		}
    
	}

	//function givePermissions() { PUEDE QUE NO SIRVA PARA NADA
	//	let nameRoute = getUrl(cadena) + "private/viade/routes/" + ruta + ".ttl";
	//	sharing(cadena, checkedItems, nameRoute);
	//}

	return (

				<button id="shareRoute" onClick={(e) => shareWithFriends(e)}>
					{ nombreBoton }
				</button>

	);
};

export default Notifications;