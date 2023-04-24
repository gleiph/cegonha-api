const Neighborhoods = require("../database/models/Neighborhoods");

module.exports = {
  // ==> Método responsável por listar todos os 'Bairros':
  all(req, res, next) {
    Neighborhoods.findAll()
      .then((result) => {
        resultNames = result.map((r) => r.name);
        res.json(resultNames);
      })
      .catch(next);
  },
  findByName: async function  (req, res, next) {
    const name  = req.params.name;
     Neighborhoods.findOne({
      where: {name: name}
     }).then((result) => {
      res.json(result)
   }).catch(next);
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
  findByIdSiscoveryAddress: async function (req,res,next) {
    const id = req.params.id;
    Neighborhoods.findAll({
      where: { discovery_address_id: id }
    }).then((result) => {
       res.send(result);
    })
  },
  updateIdDiscoveryAddress: async function (req, res, next) {
    const { idDiscoveryAddress, district } = req.body
    if (idDiscoveryAddress) {
      district.forEach(async element => {
        await Neighborhoods.update(
          {
            discovery_address_id: idDiscoveryAddress
          },
          { where: { name: element } }
        )
      });
      /*await Neighborhoods.update(
        {
          discovery_address_id: idDiscoveryAddress
        },
        { where: { id: id } }
      ).then((result) => {
        res.json(result);
      });*/
      res.json("sucesso")
    }
  }

  /*findByName(req, res, next) {
    const name = req.params.name;
    Neighborhoods.findAll({
      where: {
        name: name,
      },
    }).then((result) => {
      res.send(result);
    })
    .catch(next)
  }*/
};
