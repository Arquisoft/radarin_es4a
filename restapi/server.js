const express = require("express");
const promBundle = require("express-prom-bundle");
const cors = require("cors");
const api = require("./api");
const db = require("./database");

function connect(){
    const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017";
    const server_port = process.env.PORT || 5000;

    console.log("WELCOME TO SERVER.JS");

    // Inicializar la BD
    db.init( mongo_uri );

    const app = express();
    const metricsMiddleware = promBundle({includeMethod: true});
    app.use(metricsMiddleware);

    app.use(cors());
    app.options("*", cors());
    app.use(express.json());

    app.use("/api", api);

    app.listen(server_port, () => console.log("Servidor iniciado. Escuchando en " + server_port));
}

setTimeout(connect, 5000);