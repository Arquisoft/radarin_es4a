const express = require("express")
const promBundle = require("express-prom-bundle");
const cors = require('cors');
const api = require("./api");
const db = require("./database");

async function connect(){
    //The MONGO_URI variable is the connection string to MongoDB Atlas (for production). This env variable is created in heroku.
    const mongo_uri = process.env.MONGO_URI || "mongodb://localhost:27017";

    // Escuchar peticiones en puerto 5000 o según variable de entorno
    const server_port = process.env.PORT || 5000;

    // Inicializar la BD
    db.init( mongo_uri );

    // Cargar FW Express
    const app = express()

    //Monitoring middleware
    const metricsMiddleware = promBundle({includeMethod: true});
    app.use(metricsMiddleware);

    app.use(cors());
    app.options('*', cors());
    app.use(express.json())

    // Anteponer /api a todas las llamadas
    app.use("/api", api)

    app.listen(server_port, () => console.log("Servidor iniciado. Escuchando en " + server_port))
}

setTimeout(connect, 5000)