const express = require("express");
const router = express.Router();
const db = require("./database");
const { default: data } = require('@solid/query-ldflex')
const auth = require('solid-auth-cli');
const client = require("async-redis").createClient();


async function getUserProfilePicture(userWebid) {
    const user = data[userWebid];
    return await user.vcard$hasPhoto;
}

async function getUserFriends(userWebid) {
    let responseFriends = [];

    const user = data[userWebid];

    for await (const name of user.friends) {
        let friendPhoto = await data[name.toString()].vcard$hasPhoto;
        friendPhoto = (friendPhoto === undefined) ? "empty" : friendPhoto;

        response_friends.push({
            "webid": name.toString(),
            "photo": friendPhoto.toString()
        });
    }
    return responseFriends;
}

/**
 * Obtiene los amigos de un usuario.
 */
router.post("/user/friends", async (req, res) => {
    let response_friends = await getUserFriends( user_webid );
    res.type( "json" ).status( 200 ).send({ "friends": response_friends });
});

router.post("/user/friends/add", async (req, res) => {
    /*
    .fetch("https://your.pod/resource", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/sparql-update",
        },
        body: "INSERT DATA { <user_webid> <http://xmlns.com/foaf/0.1/knows> <friend_webid> . }",
    });
    */
});

/**
 * Inicia sesión en el POD de un usuario y devuelve sus credenciales
 * de sesión.
 */
router.post("/user/login", async (req, res) => {
    let identProv = req.body.ident_prov;
    let username   = req.body.username;
    let password   = req.body.password;
    let friends;
    let session;
    let profile_picture;
    let error = {status: false, msg: ""}

    // Is the user logged in?
    // TODO: verify signature here, don't trust the username
    let cached_session = (await client.get(username.toString()) == "") ? null : JSON.parse(await client.get(username));

    // Check if the user is re-login
    if ( cached_session == null ) {
        // No cached session, log the user in.
        await auth
            .login({idp: ident_prov, username: username, password: password})
            .then( async g_session => { // Got session
                session = g_session;
                session.sessionKey = JSON.parse(g_session.sessionKey);

                // Save user credentials in redis cache
                await client.set(username.toString(), JSON.stringify(session));
            })
            .catch(err => { /* Ups! Something happened, maybe password mismatch? */
                error.status = true;
                error.msg = err.toString();
            });
    }
    // There is a previous session!
    else {
        console.log( await client.get(username) );
        console.log( "Restoring session..." );
        session = JSON.parse(await client.get(username));
        console.log(session);
    }

    // No errors
    if ( !error.status ) {
        let user = await db.findByWebId( session.webId );

        if (user) {
            // User is registered on Radarin
            friends = await getUserFriends( session.webId );
            profile_picture = await getUserProfilePicture( session.webId );

            let temp_friends = [];

            // Loop friends and find their last location to sent it to the client.
            for (let friend of friends) {
                console.log(friend);
                let friend_record = await db.findByWebId( friend.webid );

                // Process only those friends who have an account in Radarin
                if (friend_record != null) {
                    console.log("FRIEND_RECORD: ");
                    console.log(friend_record);

                    temp_friends.push({ "webid": friend.webid, "photo": friend.photo, "location": friend_record.data });
                }
            }

            // Swap temp_friends and friends
            friends = temp_friends;

            /* TODO:
                JWT sign a key to identify the user and use that as the key in a sessions HashMap. */

            return res.type( "json" ).status( 200 ).send(
                {
                    "res": "OK",
                    "msg": "User login successful!",
                    "user": {
                        "webid": session.webId,
                        "username": username,
                        "photo": profile_picture.toString(),
                        "ident_prov": ident_prov,
                        "session": session,
                        "friends": friends
                    }
                }
            );

        } else {
            return res.type( "json" ).status( 401 ).send( { "res": "KO", "msg": "User " + username + " is not registered!" } );
        }
    }
    else {
        return res.type( "json" ).status( 401 ).send( { "res": "KO", "msg": error.msg  } );
    }
});

/**
 * Actualiza el estado de un usuario.
 */
router.post("/users/update", async (req, res) => {
    let webid = req.body.webid;
    let friends = req.body.data.friends;
    let lastLocation = req.body.data.last_location;
    let friendsLocation = new Map();

    try { // Guardar la ubicación del usuario en la base de datos
        db.updateUser( webid, last_location );
      
    } catch (error) {
        // Si hay un error, notificar al front
        res.type( "json" ).status( 500 ).send( {"code": 500, "message": "Error updating user location."} );
    }

    // Recorrer la lista de amigos ([<webid1>, <webid2>, ...])
    for( let i = 0; i < friends.length; i++ ) {
        let friend_webid = friends[i];
        let friend = await db.findByWebId( friend_webid ).then( (result) => {
            return result;
        } );
        friends_location.set( friend_webid, friend.data );
    }

    // https://stackoverflow.com/questions/37437805/convert-map-to-json-object-in-javascript
    const autoConvertMapToObject = (map) => {
        const obj = {};
        for (const item of [...map]) {
          const [
            key,
            value
          ] = item;
          obj[key] = value;
        }
        return obj;
    };

    let response_object = autoConvertMapToObject( friends_location );
    res.type( "json" ).status( 200 ).send( responseObject );
});

/**
 * Registra a un usuario en el sistema.
 */
router.post("/users/register", async (req, res) => {
    let webid = req.body.webid;
    let data = req.body.data;

    // Comprobar si existe el usuario
    let user = await db.findByWebId(webid);
    if ( user ){
        // El usuario ya existe, notificar.
        res.type( "json" )
            .status( 403 )
            .send( {"code": 403, "message": "User already registered"} );
    }
    else {
        // El usuario no existe, añadir a la BD.
        let user = db.addUser(webid, data);
        let userId = user._id;

        // Notificar 
        res.type( "json" ).status( 200 ).send( {"code": 200, "message": "User added. Everything is OK.", "id": userId } );
    }
});

/**
 * Lista todos los usuarios de la base de datos.
 */
router.get("/users/list", async(req, res) => {
    let usuarios = await db.userList();
    
    if(usuarios !== null && usuarios !== undefined) {
        res.type("json").status(200).send( usuarios );
    }
});

/**
 * Devuelve todos los usuarios activos.
 */
router.get("/users/currently", async(req, res) => {
    let usuarios = await db.userList();
    
    var ahora = new Date(Date.now());
    let usuariosActivos = [];

    for( let i = 0; i < usuarios.length; i++ ) {

        var ultimaVezVisto = new Date(usuarios[i].data.timestamp);
        var ban = await db.isBanned(usuarios[i].webid);
        
        if (ban === null){
            if (ultimaVezVisto.getFullYear() === ahora.getFullYear() 
            && ultimaVezVisto.getMonth() === ahora.getMonth() 
            && ultimaVezVisto.getDay() === ahora.getDay()){
                if ( (ahora.getHours()-ultimaVezVisto.getHours()) === 1
                && (ahora.getMinutes() + 60 -  ultimaVezVisto.getMinutes()) <= 15){
                    usuariosActivos.push(usuarios[i].webid);
                }
                else if ( ahora.getHours() === ultimaVezVisto.getHours()
                && (ahora.getMinutes() -  ultimaVezVisto.getMinutes()) <= 15){
                    usuariosActivos.push(usuarios[i].webid);
                }
            }
        }
    }
    res.type( "json" ).status( 200 ).send( usuarios_activos );
});

router.get("/users/system", async(req, res) => {
    let usuarios = await db.userList();
    
    let usuariosActivos = [];

    for( let i = 0; i < usuarios.length; i++ ) {

        var ban = await db.isBanned(usuarios[i].webid);
        
        if (ban === null){
            usuariosActivos.push(usuarios[i]);
        }
    }

    res.type( "json" ).status( 200 ).send( usuariosActivos );
    
});

router.post("/isBanned", async(req, res) => {
    var webid = req.body.webid;

    var ban = await db.isBanned(webid);
    
    res.type( "json" ).status( 200 ).send( ban );
    
});

router.get("/admin", async(req, res) => {
    let admin = await db.getAdmin();

    if(admin !== null && admin !== undefined) {
        res.type("json").status(200).send(admin);
    }
});

router.post("/remove/user", async(req, res) => {
    let webid = req.body.webid;

    if(webid !== null && webid !== undefined) {
        db.removeUser(webid);
        res.type("json").status(200).send({"code": 200, "message": "User remove. Everything is OK.", "webid": webid});
    }
});

router.get("/users/ban", async(req, res) => {
    let usuarios = await db.userListBanned();
    
    if(usuarios !== null && usuarios !== undefined) {
        res.type("json").status(200).send(usuarios);
    }
});

router.post("/ban", async(req, res) => {
    let webid = req.body.webid;

    if(webid !== null && webid !== undefined) {
        db.banUser(webid);
        res.type("json").status(200).send({"code": 200, "message": "User banned. Everything is OK.", "webid": webid});
    }
});

router.post("/unban", async(req, res) => {
    let webid = req.body.webid;

    if(webid !== null && webid !== undefined) {
        db.unbanUser(webid);
        res.type("json").status(200).send({"code": 200, "message": "User unbanned. Everything is OK.", "webid": webid});
    }
});

module.exports = router;