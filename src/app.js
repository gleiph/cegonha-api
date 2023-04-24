const express = require("express");
const cors = require("cors");

const app = express();
const userRoute = require("./routes/User");
const userAdressRoute = require("./routes/UserAdress");
const adressRoute = require("./routes/Adress");
const medicalCenterRoute = require("./routes/MedicalCenter");
const coverAddressRoute = require("./routes/CoverAddress");
const discoveryCoverRoute = require("./routes/DiscoveryAddress");
const messageRoute = require("./routes/Message");
const contactRoute = require("./routes/Contact");
const neighborhoodRoute = require("./routes/Neighborhoods");



// ==> Rotas da API:
const index = require("./routes/index");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ type: "application/vnd.api+json" }));
app.use(cors({ origin: true, credentials: true }));


app.use(index);
app.use("/", userRoute);
app.use("/", userAdressRoute);
app.use("/", adressRoute);
app.use("/", medicalCenterRoute);
app.use("/", coverAddressRoute);
app.use("/", discoveryCoverRoute);
app.use("/", messageRoute);
app.use("/", contactRoute);
app.use("/", neighborhoodRoute);



//error handling
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === "production")
    res.status(500).json({ error: "internal server error " });
  else return next(err);
});
module.exports = app;


