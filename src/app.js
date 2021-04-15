const express = require('express');
const cors = require('cors');

const app = express();
const carsRoute = require('./routes/Cars')

// ==> Rotas da API:
const index = require('./routes/index');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors({origin: true, credentials: true}));

app.use(index);
app.use('/', carsRoute);

module.exports = app;