// config
const express = require("express");
const app = express();
const port = 3000;

// app uses
app.use(express.static("src"));
app.use(express.json());

// variables
const products = [
    { id: 1, name: "PS1" },
    { id: 2, name: "PS2" },
    { id: 3, name: "PS3" },
    { id: 4, name: "PS4" },
    { id: 5, name: "PS5" },
];

// routes
app.get("/products", (req, res) => {
    console.log(req.query.id);
    const productsFound = products.filter(
        (currItem) => currItem.id == req.query.id
    );
    console.log(productsFound);
    res.json(productsFound);
});

app.get("/products/all", (req, res) => {
    res.json(products);
});

app.post("/products", (req, res) => {
    console.log(req.body.id)
    if (products.some((obj) => obj.id == req.body.id)) {
        console.log("tem produto com esse ID");
        res.sendStatus(406);
    } else {
        console.log("não tem produto com esse ID");
        products.push(req.body);
        console.log("registered");
        res.json(products).status(201);
    }
});

app.delete("/products", (req, res) => {
    products.splice(req.body.index, 1);
    res.json(products);
});

app.put("/products", (req, res) => {
    if (products.some((obj) => obj.id == req.body.id)) {
        const index = products.findIndex(element => element.id == req.body.id)
        products[index].name = req.body.name;
        console.log(products)
        res.json(products)
    } else {
        res.sendStatus(404)
    }
})

// listen
app.listen(port, () => {
    console.log(`Página rodando na URL: http://localhost:${port}`);
});
