// config
const fs = require('fs')
const express = require('express');
const app = express();
const cors = require('cors')
const port = 3040;
app.use(cors());

// imports
let users = require('./data/users2.json');

// modules
const filterByBirthday = require(__dirname +'/modules/filterByBirthday.js');
const filterByDepartment = require(__dirname +'/modules/filterByDepartment.js');
const filterByRamal = require(__dirname +'/modules/filterByRamal.js');
const searchInUsers = require(__dirname + '/modules/searchInUsers.js');

app.get('/', (req, res) => {
    // res.sendFile(__dirname + '/public/index.html');
})

app.get('/birthdays', (req, res) => {
    let resToSend = filterByBirthday(req.query.month, users);
    res.json(resToSend);
})

app.get('/departaments', (req, res) => {
    let resToSend = filterByDepartment(req.query.department, users);
    res.json(resToSend);
})

app.get('/ramals', (req, res) => {
    res.json(filterByRamal(users));
})

app.get('/users', (req, res) => {
    let resToSend;
    if (req.query.id) {
        resToSend = searchInUsers('id', req.query.id, users);
    } else if (req.query.name) {
        resToSend = searchInUsers('fullName', req.query.name, users);
    } else if (req.query.email) {
        resToSend = searchInUsers('email', req.query.email, users);
    }
    res.json(resToSend);
})

app.listen(port, () => {
    console.log(`Servidor escutando a URL: http://localhost:${port}`);
})