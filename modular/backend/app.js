const express = require('express');
const app = express();
const port = 3000;
let users = require('./data/users.js').users;
let ramals = require('./data/ramals').ramals;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

app.get('/birthdays', (req, res) => {  
})

app.listen(port, () => {
    console.log(`Servidor rodando na URL: http://localhost:${port}`);
})