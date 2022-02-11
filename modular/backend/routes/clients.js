// config

const express = require("express");
const router = express.Router();

// imports
let users = require("../data/clientsAPI/users.json");

// modules
const filterByBirthday = require("../modules/clientsAPI/filterByBirthday.js");
const filterByDepartment = require("../modules/clientsAPI/filterByDepartment.js");
const filterByRamal = require("../modules/clientsAPI/filterByRamal.js");
const searchInUsers = require("../modules/clientsAPI/searchInUsers.js");
const addReqBodyToJSON = require("../modules/addtojson.js");

// routes
router.get("/birthdays", (req, res) => {
    let resToSend = filterByBirthday(req.query.month, users);
    res.json(resToSend);
});

router.get("/departaments", (req, res) => {
    let resToSend = filterByDepartment(req.query.department, users);
    res.json(resToSend);
});

router.get("/ramals", (req, res) => {
    res.json(filterByRamal(users));
});

router.get("/users", (req, res) => {
    let resToSend;
    if (req.query.id) {
        resToSend = searchInUsers("id", req.query.id, users);
    } else if (req.query.name) {
        resToSend = searchInUsers("fullName", req.query.name, users);
    } else if (req.query.email) {
        resToSend = searchInUsers("email", req.query.email, users);
    }
    res.json(resToSend);
});

router.post("/add-new-employee", (req, res) => {
    console.log(req.body);
    addReqBodyToJSON ("./data/clientsAPI/users.json", req.body)    
    res.sendStatus(201);
});

module.exports = router;