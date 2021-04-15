const Car = require("../database/models/Car");

module.exports = {
  all(req, res, next) {
    Car.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

  create(req, res, next) {
    const { brand, model, hp } = req.body;

    Car.create({
      brand,
      model,
      hp,
    })
      .then((result) => {
        res.status(201).json(result); //return with ID -> 201 (CREATED)
      })
      .catch(next);
  },
};