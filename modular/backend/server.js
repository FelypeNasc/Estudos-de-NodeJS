// config
const cors = require("cors");
const express = require("express");
const app = express();
const port = 3040;

// app uses
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/clients", require("./routes/clients.js"));


app.listen(port, () => {
    console.log(`Servidor escutando a URL: http://localhost:${port}`);
});
