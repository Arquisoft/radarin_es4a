const express = require("express");
const router = express.Router();
const db = require("./database");
const { default: data } = require('@solid/query-ldflex')
const auth = require('solid-auth-cli');

async function getUserProfilePicture(user_webid) {
    const user = data[user_webid];
    return await user.vcard$hasPhoto;
}

async function getUserFriends(user_webid) {
    let response_friends = [];

    const user = data[user_webid];

    for await (const name of user.friends) {
        let friend_photo = await data[name.toString()].vcard$hasPhoto;
        friend_photo = (friend_photo == undefined) ? "empty" : friend_photo;

        console.log(name.toString());
        console.log(friend_photo.toString());

        response_friends.push({
            "webid": name.toString(),
            "photo": friend_photo.toString()
        })
    }
    return response_friends;
}

/**
 * Obtiene los amigos de un usuario.
 */
router.post("/user/friends", async (req, res) => {
    let user_webid = req.body.user_webid;

    let response_friends = await getUserFriends( user_webid );

    res.type( "json" ).status( 200 ).send({"friends": response_friends });
});

/**
 * Inicia sesión en el POD de un usuario y devuelve sus credenciales
 * de sesión.
 */
router.post("/user/login", async (req, res) => {
    let ident_prov = req.body.ident_prov;
    let username   = req.body.username;
    let password   = req.body.password;
    let friends;
    let session;
    let profile_picture;

    console.log("User login triggered: " + username);

    await auth.login({ idp: ident_prov, username: username, password: password })
        .then( g_session =>  {
            session = g_session;
            session.sessionKey = JSON.parse(g_session.sessionKey);
            console.log("Got session:" + session.toString());
        })
        .catch( error => { // Ups! Something happened, maybe password mismatch?
            res.type( "json" ).status( 401 ).send( { "res": "KO", "error": error } );
        });

    friends = await getUserFriends( session.webId );
    console.log("Friends: " + friends);

    profile_picture = await getUserProfilePicture( session.webId );
    console.log("Profile picture: " + profile_picture);

    res.type( "json" ).status( 200 ).send(
        {
            "res": "OK",
            "msg": "User login successful!",
            "user": {
                "webid": session.webId,
                "username": username,
                "photo": profile_picture,
                "ident_prov": ident_prov,
                "session": session,
                "friends": friends
            }
        }
    );
});

/**
 * Actualiza el estado de un usuario.
 */
router.post("/users/update", async (req, res) => {
    let webid = req.body.webid;
    let friends = req.body.data.friends;
    let last_location = req.body.data.last_location;

    let friends_location = new Map();

    try { // Guardar la ubicación del usuario en la base de datos
        //console.log("Actualizando la ubicación del usuario: " + webid);
        db.updateUser( webid, last_location );

    } catch (error) {
        // Si hay un error, notificar al front
        res.type( "json" ).status( 500 ).send( {"code": 500, "message": "Error updating user location."} );
    }

    //console.log("Recorriendo la lista de amigos...");
    //console.log("Amigos: [" + friends + "]");

    // Recorrer la lista de amigos ([<webid1>, <webid2>, ...])
    for( let i = 0; i < friends.length; i++ ) {
        let friend_webid = friends[i];
        //console.log("Buscando a: " + friend_webid);

        let friend = await db.findByWebId( friend_webid ).then( (result) => { 
            //console.log("Encontrado!. Datos:");
            //console.log(result.data);
            return result;
        } );

        //console.log("Añadiendo amigo al Map...");
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

    var response_object = autoConvertMapToObject( friends_location );

    res.type( "json" ).status( 200 ).send( response_object );
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
        let user_id = user._id;

        // Notificar 
        res.type( "json" )
            .status( 200 )
            .send( {"code": 200, "message": "User added. Everything is OK.", "id": user_id} );
    }
});

/**
 * Lista todos los usuarios de la base de datos.
 */
router.get("/users/list", async(req, res) => {
    let usuarios = await db.userList();
    
    if(usuarios !== null && usuarios !== undefined) {
        res.type("json").status(200).send(usuarios);
    }
});

/**
 * Devuelve todos los usuarios activos.
 */
router.get("/users/currently", async(req, res) => {
    let usuarios = await db.userList();
    
    var ahora = new Date(Date.now());
    let usuarios_activos = [];

    for( let i = 0; i < usuarios.length; i++ ) {

        var ultimaVezVisto = new Date(usuarios[i].data.timestamp);
        var ban = await db.isBanned(usuarios[i].webid);
        
        if (ban === null){
            if (ultimaVezVisto.getFullYear() === ahora.getFullYear() 
            && ultimaVezVisto.getMonth() === ahora.getMonth() 
            && ultimaVezVisto.getDay() === ahora.getDay()){
                if ( (ahora.getHours()-ultimaVezVisto.getHours()) === 1
                && (ahora.getMinutes() + 60 -  ultimaVezVisto.getMinutes()) <= 15){
                    usuarios_activos.push(usuarios[i].webid);
                }
                else if ( ahora.getHours() === ultimaVezVisto.getHours()
                && (ahora.getMinutes() -  ultimaVezVisto.getMinutes()) <= 15){
                    usuarios_activos.push(usuarios[i].webid);
                }
            }
        }
    }

    res.type( "json" ).status( 200 ).send( usuarios_activos );
    
});

router.get("/users/system", async(req, res) => {
    let usuarios = await db.userList();
    
    let usuarios_activos = [];

    for( let i = 0; i < usuarios.length; i++ ) {

        var ban = await db.isBanned(usuarios[i].webid);
        
        if (ban === null){
            usuarios_activos.push(usuarios[i]);
        }
    }

    res.type( "json" ).status( 200 ).send( usuarios_activos );
    
});

router.get("/isBanned", async(req, res) => {
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
    
    if(usuarios !== null && usuarios !== undefined)
        res.type("json").status(200).send(usuarios);
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