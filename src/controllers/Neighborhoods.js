const Neighborhoods = require("../database/models/Neighborhoods");

module.exports = {
  // ==> Método responsável por listar todos os 'Bairros':
  all(req, res, next) {
    Neighborhoods.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },
  // ==> Método responsável por criar um novo 'Bairro':
  create(req, res, next) {
    const { name } = req.body;
    const errors = [];

    if (!name) {
      errors.push({ error: "name is empty" });
    }

    if (errors.length > 0) return res.status(400).json(errors);

    Neighborhoods.create({
      name,
    })
      .then((result) => {
        res.status(201).json(result); //return with ID -> 201 (CREATED)
      })
      .catch(next);
  },
};
