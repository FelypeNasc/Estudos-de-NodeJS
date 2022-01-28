// config
const express = require("express");
const app = express();
const port = 3000;

// app uses
app.use(express.static("src"));
app.use(express.json());

// variables
const users = [
    { id: 1, name: "Felype Nascimento", email: "felype.nasc@hotmail.com" },
];

// functions 
function searchInUsers(searchOption, searchInput) {  
    let usersFound = [];
    users.forEach((currItem) => {
        const currItemKey = String(currItem[searchOption]);
        if (currItemKey.includes(searchInput)) {
            usersFound.push(currItem);
        }
    });
    return usersFound
}

// routes
app.post("/add-new-customer", (req, res) => {
    users.push(req.body);
    console.log('registered');
    res.sendStatus(201);
});

app.get("/search-customers", (req, res) => {
    let usersFound = searchInUsers('id', req.query.id);
    res.json(usersFound);
})

app.delete("/delete-customer", (req, res) => {
    users.splice(req.body.index, 1);
    res.json(users);
})

// listen
app.listen(port, () => {
    console.log(`Página rodando na URL: http://localhost:${port}`);
});
