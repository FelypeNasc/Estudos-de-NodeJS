// config
const express = require("express");
const app = express();
const port = 3000;

// app uses
app.use(express.static("src"));
app.use(express.json());

// variables
const products = [
    { id: 1, name: "PS5"},
];

// functions 
function searchProductID(reqID) {  
    let productsFound = [];
    products.forEach((currItem) => {
        if (currItem.id == reqID) {
            productsFound.push(currItem);
        }
    });
    return productsFound
}

// routes
app.get("/products", (req, res) => {
    let productsFound = searchProductID(req.query.id);
    res.json(productsFound);
})

app.post("products", (req, res) => {
    products.push(req.body);
    console.log('registered');
    res.sendStatus(201);
});

app.delete("/products", (req, res) => {
    products.splice(req.body.index, 1);
    res.json(products);
})

// app.put()

// listen
app.listen(port, () => {
    console.log(`Página rodando na URL: http://localhost:${port}`);
});
