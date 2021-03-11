const express = require("express")
const User = require("./models/users")
const router = express.Router()
const db = require("./database");

// Get all users
router.get("/users/list", async (req, res) => {
    var usuarios = await db.userList();
	res.send(usuarios);
})

//register a new user or update
router.post("/users/add", async (req, res) => {
    let webid = req.body.webid;
    let data = req.body.data;
    //Check if the device is already in the db
    let user = await db.findByWebId(webid)
    if (user){
        db.updateUser(webid, data);
    }
    else{
        db.addUser(webid, data);
    }
})

module.exports = router