const { MongoClient } = require("mongodb");

let MONGO_URI = "";
let isConnected = false;
let mongoClient = null;
    
async function init( mongoUri ) {

    MONGO_URI = mongoUri;

    mongoClient = new MongoClient( MONGO_URI, { useUnifiedTopology: true });
    await mongoClient.connect();
    const database = mongoClient.db("baseDatosRadarin");

    await database.dropCollection("usuarios");
    await database.dropCollection("admin");
    await database.dropCollection("baneados");

    const users = database.collection("usuarios");
    const admin = database.collection("admin");
    const bans  = database.collection("baneados");

    const user1 = { "webid": "https://israelmnrg.inrupt.net/profile/card#me", "data": { "lat": 43.3669759938579, "lon": -5.877764106417212, "timestamp": Date.now() } };
    const user2 = { "webid": "https://ramonvilafer.inrupt.net/profile/card#me", "data": { "lat": 43.354767891444865, "lon": -5.851398652481771, "timestamp": Date.now() } };
    const user4 = { "webid": "https://cuartasfabio.inrupt.net/profile/card#me", "data": { "lat": 43.357599558753186, "lon": -5.853321185716373, "timestamp": 1619699326 } };
    const user5 = { "webid": "https://alvarofuente.inrupt.net/profile/card#me", "data": { "lat":43.355331492910125, "lon": -5.863415983665659, "timestamp": 1619699326 } };
    const user6 = { "webid": "https://uo269871.inrupt.net/profile/card#me", "data": { "lat": 43.36683582828603, "lon": -5.843256887954077, "timestamp": 1619699326 } };
    const user7 = { "webid": "https://uo269984.inrupt.net/profile/card#me", "data": { "lat": 43.35478446185927, "lon": -5.851294590408885, "timestamp": 1619699326 } };
    const user8 = { "webid": "https://vitusuarez.inrupt.net/profile/card#me", "data": { "lat": 43.35478446185927, "lon": -5.851294590408885, "timestamp": 1619699326 } };

    const userAdmin = { "webid": "https://uo271397.inrupt.net/profile/card#me" };
    const pruebaBan = { "webid": "prueba" };
    
    await users.insertMany([user1, user2, user4, user5, user6, user7, user8]);
    await admin.insertOne(userAdmin);
    await bans.insertOne(pruebaBan);

    isConnected = true;
}

async function userList() {
    const database = mongoClient.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    return users.find().toArray();
}

async function findByWebId(webid) {
    const database = mongoClient.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    return users.findOne({
        "webid" : webid
    });
}

async function getAdmin() {
    const database = mongoClient.db("baseDatosRadarin");
    const admin = database.collection("admin");
    return admin.findOne();
}

async function banUser(webid) {
    const database = mongoClient.db("baseDatosRadarin");
    const bans = database.collection("baneados");
    const user = {
        "webid" : webid
    };
    await bans.insertOne(user);
}

async function unbanUser(webid) {
    const database = mongoClient.db("baseDatosRadarin");
    const bans = database.collection("baneados");
    await bans.deleteOne({
        "webid" : webid
    });
}

async function userListBanned() {
    const database = mongoClient.db("baseDatosRadarin");
    const users = database.collection("baneados");
    return users.find().toArray();
}

async function isBanned(webid) {
    const database = mongoClient.db("baseDatosRadarin");
    const bans = database.collection("baneados");
    return bans.findOne({
        "webid": webid
    });
}

async function updateUser(webid, data) {
    const database = mongoClient.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    users.updateOne(
        {
            "webid" : webid
        },
        {
            $set: {
                "data" : data
            }
        }
    );
}

async function addUser(webid, data) {
    const database = mongoClient.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    const user = {
        "webid": webid,
        "data": data
    };
    await users.insertOne(user);
}

async function removeUser(webid) {
    const database = mongoClient.db("baseDatosRadarin");
    const users = database.collection("usuarios");
    const user = {
        "webid": webid
    };
    await users.deleteOne(user);
}

module.exports = {init, userList, findByWebId, updateUser, addUser, removeUser, getAdmin, banUser, userListBanned, unbanUser, isBanned, isConnected, MONGO_URI};