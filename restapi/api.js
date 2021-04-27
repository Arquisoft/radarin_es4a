const express = require("express");
const User = require("./models/users");
const router = express.Router();
const db = require("./database");

/* Ejemplo de datos a procesar: 
{
    "webid" : <webid>, 
    "data" : { 
        "friends" : [<webid1>, <webid2>, ...], 
        "last_location": {
            "lat": 124, 
            "lon": 123, 
            "timestamp" : 917923719823
        } 
    } 
} */
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

    // Devolver la última ubicación de los amigos 
    /* 
    Ejemplo de respuesta: 
    { 
        "https://alvarofuente.inrupt.net/profile/card#me": {
            "lat": 124, 
            "lon": 123, 
            "timestamp" : 917923719823
        },
        "https://cuartasfabio.inrupt.net/profile/card#me": {
            "lat": 124, 
            "lon": 123, 
            "timestamp" : 917923719823
        },
        "https://ramonvilafer.inrupt.net/profile/card#me": {
            "lat": 124, 
            "lon": 123, 
            "timestamp" : 917923719823
        }
    } */

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

    //console.log(friends_location);
    //console.log(response_object);

    res.type( "json" ).status( 200 ).send( response_object );
});



// Registro de un usuario
router.post("/users/add", async (req, res) => {
    let webid = req.body.webid;
    let data = req.body.data;

    // Comprobar si existe el usuario
    let user = await db.findByWebId(webid);
    if ( user ){
        // El usuario ya existe, notificar al usuario.
        res.type( "json" ).status( 403 ).send( {"code": 403, "message": "User already registered"} );
    }
    else {
        // El usuario no existe, lo añadimos a la base de datos
        let user = db.addUser(webid, data);
        let user_id = user._id;

        // Notificar 
        res.type( "json" ).status( 200 ).send( {"code": 200, "message": "User added. Everything is OK.", "id": user_id } );
    }
});

router.get("/users/list", async(req, res) => {
    let usuarios = await db.userList();
    
    if(usuarios !== null && usuarios !== undefined)
        res.type("json").status(200).send(usuarios);
});

router.get("/users/currently", async(req, res) => {
   // TODO Devuelve los usuarios conectados actualmente
});

router.get("/admin", async(req, res) => {
    let admin = await db.getAdmin();

    if(admin !== null && admin !== undefined)
        res.type("json").status(200).send(admin);
});

module.exports = router;