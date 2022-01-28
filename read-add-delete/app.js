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

// routes
app.post("/add-new-customer", (req, res) => {
    users.push(req.body);
    console.log('Ok')
    res.sendStatus(201);
});

// listen
app.listen(port, () => {
    console.log(`Página rodando na URL: http://localhost:${port}`);
});
