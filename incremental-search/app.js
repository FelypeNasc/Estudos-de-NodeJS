const express = require('express');
const app = express();
const port = 3000;
let users = require('./data/users.js').users;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/public/style.css");
});
app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + "/public/script.js");
});

app.get('/users', (req, res) => {
    let resToSend;
    if (req.query.id) {
        // console.log(req.query.id)
        resToSend = searchInUsers('id', req.query.id);
    } else if (req.query.name) {
        // console.log(req.query.name)
        resToSend = searchInUsers('name', req.query.name);
    } else if (req.query.email) {
        // console.log(req.query.email)
        resToSend = searchInUsers('email', req.query.email);
    }
    res.json(resToSend);
})

function searchInUsers(searchType, searchInput) {
    let usersFound =[];
    users.forEach((currItem) => {
        const currItemKey = currItem[searchType];
        if (currItemKey.includes(searchInput)) {
            usersFound.push(currItem);
        }
    })
    return usersFound;
}

app.listen(port, () => {
    console.log(`Servidor rodando na URL: http://localhost:${port}`);
})