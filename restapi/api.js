const express = require("express");
const router = express.Router();
const db = require("./database");
const { default: data } = require("@solid/query-ldflex");
const auth = require("solid-auth-cli");

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

        responseFriends.push({
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
    let userWebid = req.body.user_webid;
    let responseFriends = await getUserFriends( userWebid );

    res.type( "json" ).status( 200 ).send({"friends": responseFriends });
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
    let profilePicture;

    await auth.login({ idp: ident_prov, username: username, password: password })
    .then( (gSession) =>  {
        session = gSession;
        session.sessionKey = JSON.parse(gSession.sessionKey);
        //console.log("Got session:" + session.toString());
    })
    .catch( (error) => { // Ups! Something happened, maybe password mismatch?
        res.type( "json" ).status( 401 ).send( { "res": "KO", "error": error } );
    });

    friends = await getUserFriends( session.webId );
    profilePicture = await getUserProfilePicture( session.webId );

    res.type( "json" ).status( 200 ).send(
        {
            "res": "OK",
            "msg": "User login successful!",
            "user": {
                "webid": session.webId,
                "username": username,
                "photo": profilePicture,
                "ident_prov": identProv,
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
    let lastLocation = req.body.data.last_location;
    let friendsLocation = new Map();
    try { // Guardar la ubicación del usuario en la base de datos
        //console.log("Actualizando la ubicación del usuario: " + webid);
        db.updateUser( webid, lastLocation );
    } catch (error) {
        // Si hay un error, notificar al front
        res.type( "json" ).status( 500 ).send( {"code": 500, "message": "Error updating user location."} );
    }
    //console.log("Recorriendo la lista de amigos...");
    //console.log("Amigos: [" + friends + "]");
    // Recorrer la lista de amigos ([<webid1>, <webid2>, ...])
    for( let i = 0; i < friends.length; i++ ) {
        let friendWebid = friends[i];
        //console.log("Buscando a: " + friend_webid);
        let friend = await db.findByWebId( friendWebid ).then( (result) => { 
            //console.log("Encontrado!. Datos:");
            //console.log(result.data);
            return result;
        } );
        //console.log("Añadiendo amigo al Map...");
        friendsLocation.set( friendWebid, friend.data );
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
    var responseObject = autoConvertMapToObject( friendsLocation );
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
        res.type("json").status(200).send(usuarios);
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
    res.type( "json" ).status( 200 ).send( usuariosActivos );
    
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