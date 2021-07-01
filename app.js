require('./config/config');
require('./models/db');
const config = require('config')
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const rtsIndex = require('./routes/index.router') //appel du dossier index.routes.js

var app = express()

app.use(bodyParser.json());
app.use(express.json());

app.use(cors());
app.use('/api', rtsIndex) // pour appeler les fonction se trouve dons rtsindex on fait localhost:3000/api/nomFunction


/* ================ send error of validate uesr model (password ,validate email , empty full name .... ) to frent  */
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});
/* ============================== end send error ================================================================ */

// start server in port qui declare dons config.json
app.listen(process.env.PORT, () => console.log(`server start in port : ${process.env.PORT}`));