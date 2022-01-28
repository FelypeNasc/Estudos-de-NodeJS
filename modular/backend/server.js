// config
const cors = require("cors");
const fs = require("fs");
const express = require("express");
const app = express();
const port = 3040;

// app uses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// imports
let users = require("./data/users.json");
const { status } = require("express/lib/response");

// modules
const filterByBirthday = require(__dirname + "/modules/filterByBirthday.js");
const filterByDepartment = require(__dirname +
    "/modules/filterByDepartment.js");
const filterByRamal = require(__dirname + "/modules/filterByRamal.js");
const searchInUsers = require(__dirname + "/modules/searchInUsers.js");

app.get("/birthdays", (req, res) => {
    let resToSend = filterByBirthday(req.query.month, users);
    res.json(resToSend);
});

app.get("/departaments", (req, res) => {
    let resToSend = filterByDepartment(req.query.department, users);
    res.json(resToSend);
});

app.get("/ramals", (req, res) => {
    res.json(filterByRamal(users));
});

app.get("/users", (req, res) => {
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

function batata(data, reg) {
    let arr = JSON.parse(data);
    arr.push(reg);
    return arr;
}

app.post("/add-new-employee", (req, res) => {
    console.log(req.body);
    fs.readFile("./data/users.json", (err, data) => {
        if (err) throw err;
        fs.writeFile(
            "./data/users.json",
            JSON.stringify(batata(data, req.body)),
            (err) => {
                if (err) throw err;
            }
        );
    });
    res.send(201);
});

app.listen(port, () => {
    console.log(`Servidor escutando a URL: http://localhost:${port}`);
});
