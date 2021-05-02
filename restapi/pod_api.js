const SolidNodeClient = require("solid-node-client");

const express = require("express");
const router = express.Router();
const { default: data } = require('@solid/query-ldflex');


/**
 * Obtiene una lista con los webids e imágenes de perfil de los amigos
 * de un usuario especificado por su webID
 */
router.post("/user/friends", async (req, res) => {
    let user_webid = req.body.user_webid;
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

    res.type( "json" ).status( 200 ).send( response_friends );
});

router.post("/user/login", async (req, res) => {
    const client = new SolidNodeClient();

    // Iniciamos sesión con las credenciales enviadas
    let session = await client.login({
        idp: req.body.idp,
        username: req.body.username,
        password: req.body.password,
    });

    // Buscar al usuario en la bd
    res.type( "json" ).status( 200 ).send( { "res": "OK", "webid": session.webid } );
});

module.exports = router;




