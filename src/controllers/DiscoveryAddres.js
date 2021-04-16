const DiscoveryAddress = require('../database/models/DiscoveryAddres');

module.exports = {
// ==> Método responsável por listar todos os 'Endereços':
    all(req, res, next) {
        DiscoveryAddress.findAll()
        .then((result) => {
          res.json(result);
        })
        .catch(next);
    },
// ==> Método responsável por criar um novo 'Endereço':
    create(req, res, next) {
      const { district, region, city, uf, cep } = req.body;
      DiscoveryAddress.create({
        district, 
        region,
        city, 
        uf, 
        cep
      })
        .then((result) => {
          res.status(201).json(result); //return with ID -> 201 (CREATED)
        })
        .catch(next);
    },
  
// ==> Método responsável por selecionar 'Endereco' pelo 'id':
    findById(req, res, next) {
        const id = req.params.id;
        DiscoveryAddress.findByPk(id)
        .then(result => {
            res.send(result);
        })
        .catch(next);
        },

// ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
        const id = req.params.id;
        const { district, region, city, uf, cep } = req.body;

        DiscoveryAddress.update({
        region : region, 
        district : district, 
        city : city, 
        uf : uf, 
        cep : cep},
        { where: {id: id} }
        )
        .then((result) => {
            res.json(result);
        })
        .catch(next);
        
        },

// ==> Método responsável por excluir um 'DiscoveryAddress' pelo 'Id':
    deleteById(req, res, next) {
        const id = req.params.id;

        DiscoveryAddress.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).send('deleted successfully a Discovery Address with id = ' + id);
        })
        .catch(next);

        },
};

