const express = require('express');
const cors = require('cors');

const app = express();
const carsRoute = require('./routes/Cars')
const userRoute = require('./routes/User')

// ==> Rotas da API:
const index = require('./routes/index');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors({origin: true, credentials: true}));

app.use(index);
app.use('/', carsRoute);
app.use('/', userRoute);

//error handling
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "production")
      res.status(500).json({ error: "internal server error" });
    else return next(err);
  });
module.exports = app;