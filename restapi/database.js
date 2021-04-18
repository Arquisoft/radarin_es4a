const { MongoClient } = require("mongodb");

let MONGO_URI = "";
let isConnected = false;
let mongo_client = null;
    
async function init( mongo_uri ) {

    MONGO_URI = mongo_uri;
    mongo_client = new MongoClient( MONGO_URI );

    console.log("Conectando con base de datos en " + mongo_uri + "!!");

    await mongo_client.connect();

    console.log("Conexión realizada!");

    console.log("Creando base de datos Radarin");
    const database = mongo_client.db("baseDatosRadarin");
    
    console.log("Eliminando colecciones existentes...");
    console.log("...usuarios");
    database.dropCollection("usuarios");
    console.log("...admin");
    database.dropCollection("admin");
    console.log("...baneados");
    database.dropCollection("baneados");
    console.log("OK");

    console.log("Creando colecciones vacias...");
    console.log("..usuarios");
    const users = database.collection("usuarios");
    console.log("...admin");
    const admin = database.collection("admin");
    console.log("...baneados");
    const bans = database.collection("baneados");
    console.log("OK");

    const user1 = { "webid": "https://israelmnrg.inrupt.net/profile/card#me", "data": { "lat": 43.3669759938579, "lon": -5.877764106417212, "timestamp": Date.now() } };
    const user2 = { "webid": "https://alvarofuente.inrupt.net/profile/card#me", "data": { "lat": 43.354767891444865, "lon": -5.851398652481771, "timestamp": Date.now() } };
    const user3 = { "webid": "https://uo271397.inrupt.net/profile/card#me", "data": { "lat": 43.36353462859176, "lon": -5.850477590513935, "timestamp": Date.now() } };
    const user4 = { "webid": "https://cuartasfabio.inrupt.net/profile/card#me", "data": { "lat": 43.357599558753186, "lon": -5.853321185716373, "timestamp": Date.now() } }; 
    const user5 = { "webid": "https://vitusuarez.inrupt.net/profile/card#me", "data": { "lat":43.355331492910125, "lon": -5.863415983665659, "timestamp": Date.now() } };
    const user6 = { "webid": "https://uo269871.inrupt.net/profile/card#me", "data": { "lat": 43.36683582828603, "lon": -5.843256887954077, "timestamp": Date.now() } };
    const user7 = { "webid": "https://uo269984.inrupt.net/profile/card#me", "data": { "lat": 43.35478446185927, "lon": -5.851294590408885, "timestamp": Date.now() } };
    
    const userAdmin = { "webid": "https://ramonvilafer.inrupt.net/profile/card#me" };

    const pruebaBan = { "webid": "prueba" };
    
    console.log("Insertando usuarios...");
    await users.insertMany([user1, user2, user3, user4, user5, user6, user7]);
    
    console.log("Insertando administrador...");
    await admin.insertOne(userAdmin);

    console.log("Insertando baneado...");
    await bans.insertOne(pruebaBan);

    console.log("OK. Datos insertados!");

    isConnected = true;
}

async function userList() {
    const database = mongo_client.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    var usuariosEncontrados = users.find().toArray();
    return usuariosEncontrados;
}

async function findByWebId(webid) {
    const database = mongo_client.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    return users.findOne({ "webid" : webid });
}

async function getAdmin() {
    const database = mongo_client.db("baseDatosRadarin");
    const admin = database.collection("admin");
    var userAdmin = admin.findOne();
    return userAdmin;
}

async function banUser(webid) {
    const database = mongo_client.db("baseDatosRadarin");
    const bans = database.collection("baneados");
    const user = { "webid" : webid };
    await bans.insertOne(user);
}

async function unbanUser(webid) {
    const database = mongo_client.db("baseDatosRadarin");
    const bans = database.collection("baneados");
    await bans.deleteOne({ "webid" : webid });
}

async function isBanned(webid) {
    const database = mongo_client.db("baseDatosRadarin");
    const bans = database.collection("baneados");
    var baneado = bans.findOne({ "webid" : webid });
    if (baneado != null) {
        return true;
    }
    return false;
}

async function updateUser(webid, data) {
    const database = mongo_client.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    users.updateOne({"webid" : webid }, { $set: {"data" : data} });
}

async function addUser(webid, data) {
    const database = mongo_client.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    const user = { "webid": webid, "data": data };
    await users.insertOne(user);
}

module.exports = {init, userList, findByWebId, updateUser, addUser, getAdmin, banUser, unbanUser, isBanned, isConnected, MONGO_URI}