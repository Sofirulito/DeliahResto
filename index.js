const express = require('express');
const app = express();
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser');

// Crea o levanta base de datos
require("./db");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/', apiRouter);

app.get('/', (req, res) => {
    res.send('Bienvenido a Deliah Resto')
})

app.listen(3000, () => {
    console.log('Servidor ok')
})