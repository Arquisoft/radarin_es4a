import ldflex from "@solid/query-ldflex";

/**
 * Checks if the entered webId corresponds to a valid user
 * @param friendWebId		WebId to check
 * @returns {Promise<*>}	Promise to make the async call
const isWebIdValid = async (friendWebId) => {
	console.log("iswebidvalid");
	const fc = new FileClient(auth);
	let session = await auth.currentSession();
	if (!session) { session = await auth.login(); }
	try {
		let op = async (client) => await client.itemExists(friendWebId);
		return await op(fc);
	} catch (e) {
		session = await auth.currentSession();
	}
};
 * Checks if the specified webId corresponds to an already friend user
 * @param friendWebId				WebId to check
 * @param user						Current user
 * @returns {Promise<boolean>}		Promise to make the async call
 
const isFriend = async (friendWebId, user) => {
	console.log("isFriend");
	for await (const friend of user.friends)
		if (String(friend).localeCompare(String(friendWebId)) === 0) {return true;}
	return false;
};

export const getUser = async() => {
	console.log("Empezando metodo getUser");
	const user = await data['https://israelmnrg.inrupt.net/profile/card#me'];
	console.log("Acabando metodo getUser");
}
*/
/**
 * Adds the friend if it is valid and not a friend already, if not throws an error message
 * @param friendWebId			WebId of the friend to add
 * @param userWebId				current user WebId
 * @returns {Promise<void>}		promise to make the async call
 */
export const addFriend = async (friendWebId, userWebId) => {
	console.log(friendWebId);
	console.log(userWebId);
	// Checks the input is valid
	if (friendWebId == null || userWebId == null || friendWebId === "" || userWebId === ""){ return; }
	// Loads the current user
	console.log("user");
	// Checks the friend exists
	await ldflex[userWebId].knows.add(ldflex[friendWebId])
	setTimeout(function() {
		window.location.reload();
	}, 1000);
};


