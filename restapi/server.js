const express = require("express")
const promBundle = require("express-prom-bundle");
const cors = require('cors');
const api = require("./api") 
const db = require("./database");

async function connect(){
    //The MONGO_URI variable is the connection string to MongoDB Atlas (for production). This env variable is created in heroku.
    

    const app = express()

    //Monitoring middleware
    const metricsMiddleware = promBundle({includeMethod: true});
    app.use(metricsMiddleware);

    app.use(cors());
    app.options('*', cors());
    app.use(express.json())
    app.use("/api", api)


    app.listen(process.env.PORT || 5000, () => {
        console.log("Server has started! Using db")
    })

    db.init();
}

connect();