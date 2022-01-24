// config
const express = require('express');
const app = express();
const port = 3000;



app.listen(port, () => {
    console.log(`Página rodando na URL: http://localhost:${port}`);
})