// config
const fs = require('fs')
const express = require('express');
const app = express();
const port = 3043;

// imports
let users = require('./data/users.js').users;
let ramals = require('./data/ramals').ramals;

// modules
const filterByBirthday = require(__dirname +'/modules/filterByBirthday.js');
const filterBySector = require(__dirname +'/modules/filterBySector.js');
const filterByRamal = require(__dirname +'/modules/filterByRamal.js');

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/birthdays', (req, res) => {
    let resToSend = filterByBirthday(req.query.month, users);
    res.json(resToSend);
})

app.get('/sectors', (req, res) => {
    let resToSend = filterBySector(req.query.sector, users);
    res.json(resToSend);
})

app.get('/ramals', (req, res) => {
    res.json(filterByRamal(users));
})

app.listen(port, () => {
    console.log(`Servidor escutando a URL: http://localhost:${port}`);
})