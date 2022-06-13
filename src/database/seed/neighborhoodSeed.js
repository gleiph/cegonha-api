require("dotenv").config();
const Neighborhoods = require("../models/Neighborhoods");
const { neighborhoods_seed } = require("./neighborhoods");

neighborhoods_seed.forEach((element) => {
  Neighborhoods.create({
    name: element,
  });
});

Neighborhoods.findAll().then((result) => {
  console.log(result);
});
