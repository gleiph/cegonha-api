const express = require('express');
const cors = require('cors');

const app = express();
const carsRoute = require('./routes/Cars')
const userRoute = require('./routes/User')
const addressRoute = require('./routes/Address')
const medicalCenterRoute = require('./routes/MedicalCenter')
const coverAddressRoute = require('./routes/CoverAddress')
const discoveryCoverRoute = require('./routes/DiscoveryAddress')

// ==> Rotas da API:
const index = require('./routes/index');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.json({type: 'application/vnd.api+json'}));
app.use(cors({origin: true, credentials: true}));

app.use(index);
app.use('/', carsRoute);
app.use('/', userRoute);
app.use('/', addressRoute);
app.use('/', medicalCenterRoute);
app.use('/', coverAddressRoute);
app.use('/', discoveryCoverRoute);

//error handling
app.use((err, req, res, next) => {
    if (process.env.NODE_ENV === "production")
      res.status(500).json({ error: "internal server error" });
    else return next(err);
  });
module.exports = app;