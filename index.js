const express = require('express');
const app = express();
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser');
const db = require('./models')
const PORT = process.env.PORT || 3000;  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas
app.use('/', apiRouter);

app.get('/', (req, res) => {
    res.send('Bienvenido a Deliah Resto')
})

db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log('Servidor ok')
    })
})

