const express = require("express");
const promBundle = require("express-prom-bundle");
const cors = require("cors");
const api = require("./api");
const db = require("./database");

function connect(){
    const mongoUri   = process.env.MONGO_URI || "mongodb://localhost:27017";
    const serverPort = process.env.PORT || 5000;

    console.log("WELCOME TO SERVER.JS");

    // Load database
    db.init( mongoUri );

    const app = express();
    const metricsMiddleware = promBundle({includeMethod: true});
    app.use(metricsMiddleware);

    app.use(cors());
    app.options("*", cors());
    app.use(express.json());
    app.use("/api", api);

    app.listen(serverPort, () => console.log("Servidor iniciado. Escuchando en " + serverPort));
}

setTimeout(connect, 5000);