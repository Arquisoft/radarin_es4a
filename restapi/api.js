const express = require("express")
const User = require("./models/users")
const router = express.Router()
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

    let friends_location = {};

    try { // Guardar la ubicación del usuario en la base de datos
        db.updateUser( webid, last_location );

    } catch (error) {
        // Si hay un error, notificar al front
        res.type( 'json' ).status( 500 ).send( {"code": 500, "message": "Error updating user location."} );
    }

    // Recorrer la lsita de amigos
    friends.forEach( friend_webid => {
        try {
            // Buscar al amigo en la base de datos
            let friend = db.findByWebId( friend_webid );

            if (friend) { // Si hay amigo...
                // ... Añadimos su última ubicación conocida a la lista
                // que se devolverá posteriormente.
                friends_location.friend_webid = friend.data;
            }
        } catch (error) { /* ¡Fallar silenciosamente! */ }
    });

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
    res.type( 'json' ).status( 200 ).send( friends_location );
})



// Registro de un usuario
router.post("/users/add", async (req, res) => {
    let webid = req.body.webid;
    let data = req.body.data;

    // Comprobar si existe el usuario
    let user = await db.findByWebId(webid);
    if ( user ){
        // El usuario ya existe, notificar al usuario.
        res.type( 'json' ).status( 403 ).send( {"code": 403, "message": "User already registered"} );
    }
    else {
        // El usuario no existe, lo añadimos a la base de datos
        let user = db.addUser(webid, data);
        let user_id = user._id;

        // Notificar 
        res.type( 'json' ).status( 200 ).send( {"code": 200, "message": "User added. Everything is OK.", "id": user_id } );
    }
})

module.exports = router