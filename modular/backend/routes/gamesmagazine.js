const fs = require("fs");
const express = require("express");
const router = express.Router();

// data
const gamesJSONPath = "./data/gamesAPI/games.json";
const gamesJSON = require('../data/gamesAPI/games.json');

// modules
const addReqToJSON = require("../modules/addReqToJSON");


router.post("/add-new-game", (req, res) => {
    try {
        addReqToJSON(gamesJSONPath, req.body);
        res.json(gamesJSON)
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;