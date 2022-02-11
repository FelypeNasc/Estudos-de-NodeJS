// config
const express = require('express');
const app = express();
const port = 3000;

// static routes
app.use('/clients', express.static('./src/clientsAPI'));
app.use('/gamesmagazine', express.static('./src/gamesmagazine'));

app.listen(port, () => {
    console.log(`Página rodando na URL: http://localhost:${port}`);
})