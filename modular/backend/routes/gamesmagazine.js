const fs = require("fs");
const express = require("express");
const router = express.Router();

// data
let games = require("../data/gamesAPI/games.json");

// modules

router.post("/test", (req, res) => {
    console.log(req.body);
})

module.exports = router;