import ldflex from "@solid/query-ldflex";

/**
Método para añadir amigos
 */
export const addFriend = async (friendWebId, userWebId) => {
//	console.log(friendWebId);
//	console.log(userWebId);
	if (friendWebId == null || userWebId == null || friendWebId === "" || userWebId === ""){ return; }
	
//	console.log("user");
	
	await ldflex[userWebId].knows.add(ldflex[friendWebId])
	setTimeout(function() {
		window.location.reload();
	}, 1000);
};


