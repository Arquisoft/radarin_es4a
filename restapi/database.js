const { MongoClient } = require("mongodb");
const { db } = require("./models/users");
    
const uri = "mongodb://127.0.0.1:27017"
const client = new MongoClient(uri);
    
    async function init() {
        await client.connect();
        const database = client.db('baseDatosRadarin');
        database.dropCollection('usuarios');
        const users = database.collection('usuarios');

        const user1 = { "webid": "https://israelmnrg.inrupt.net/profile/card#me", "data": { "lat": 43.3669759938579, "lon": -5.877764106417212, "timestamp": Date.now() } };
        const user2 = { "webid": "https://alvarofuente.inrupt.net/profile/card#me", "data": { "lat": 43.354767891444865, "lon": -5.851398652481771, "timestamp": Date.now() } };
        const user3 = { "webid": "https://uo271397.inrupt.net/profile/card#me", "data": { "lat": 43.36353462859176, "lon": -5.850477590513935, "timestamp": Date.now() } };
        const user4 = { "webid": "https://cuartasfabio.inrupt.net/profile/card#me", "data": { "lat": 43.357599558753186, "lon": -5.853321185716373, "timestamp": Date.now() } }; 
        const user5 = { "webid": "https://vitusuarez.inrupt.net/profile/card#me", "data": { "lat":43.355331492910125, "lon": -5.863415983665659, "timestamp": Date.now() } };
        const user6 = { "webid": "https://uo269871.inrupt.net/profile/card#me", "data": { "lat": 43.36683582828603, "lon": -5.843256887954077, "timestamp": Date.now() } };
        const user7 = { "webid": "https://uo269984.inrupt.net/profile/card#me", "data": { "lat": 43.35478446185927, "lon": -5.851294590408885, "timestamp": Date.now() } };
        await users.insertMany([user1, user2, user3, user4, user5, user6, user7]);
        console.log("Datos insertados");
    }

    async function userList() {
        const database = client.db('baseDatosRadarin');
        const users = database.collection('usuarios');
        var usuariosEncontrados = users.find().toArray();
        return usuariosEncontrados;
    }

    async function findByWebId(webid) {
        const database = client.db('baseDatosRadarin');
        const users = database.collection('usuarios');
        var usuario = users.find({ "webid" : webid });
        return usuario;
    }

    async function updateUser(webid, data) {
        const database = client.db('baseDatosRadarin');
        const users = database.collection('usuarios');
        users.updateOne({"webid" : webid }, { $set: {"data" : data} });
    }

    async function addUser(webid, data) {
        const database = client.db('baseDatosRadarin');
        const users = database.collection('usuarios');
        const user = { "webid": webid, "data": data };
        await users.insertOne(user);
    }

module.exports = {init, userList, findByWebId, updateUser, addUser}