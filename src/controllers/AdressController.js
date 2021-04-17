const Address = require('../database/models/Address');
const CoverAddress = require('../database/models/CoverAddress');
const DiscoveryCoverAddress = require('../database/models/DiscoveryAddres');

const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;              // biblioteca de operadores

module.exports = {
// ==> Método responsável por listar todos os 'Endereços':
    all(req, res, next) {
      Address.findAll()
        .then((result) => {
          res.json(result);
        })
        .catch(next);
    },
// ==> Método responsável por criar um novo 'Endereço':
    create(req, res, next) {
      const { street, number, district, city, uf, cep } = req.body;
  
      Address.create({
        street, 
        number, 
        district, 
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
        Address.findByPk(id)
        .then(customer => {
            res.send(customer);
        })
        .catch(next);
        },
    // ==> Método responsável por listar todas as ruas por nome':
    findByName(req, res, next) {
        const name = req.params.name;
        CoverAddress.findAll({
        where: {
            name: {
            [Op.like]: '%'+name+'%'
            }
        }
        })
        .then(result => {
            res.send(result);
        })
        .catch(next);
    },
// ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
        const id = req.params.id;
        const { street, number, district, city, uf, cep } = req.body;

        Address.update({
        street : street, 
        number : number, 
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

// ==> Método responsável por excluir um 'Endereço' pelo 'Id':
    deleteById(req, res, next) {
        const id = req.params.id;

        Address.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).send('deleted successfully a address with id = ' + id);
        })
        .catch(next);

        },
// ==> Método responsável por selecionar uma 'Célula' pelo endereço:
        findCenterMedical (req, res, next)  {
            const { street, number, district, city, uf, cep } = req.body;

            CoverAddress.findAll({
                where: {
                  [Op.and]: [{street: street}, {[Op.or]: [{number_start:{ [Op.lte]: number}}, {number_start: null}]}, {[Op.or]: [{number_end:{ [Op.lte]: number}}, {number_end: null}]}, {district: district}, {city: city}, {uf: uf}, {cep: cep}]
                }
            })
                .then(result => {
                    
                    if(result != ""){
                        res.send(result);}
                    else{
                        DiscoveryCoverAddress.findAll({
                            where: {
                               district: district
                              }
                    }).then(resu => {

                        res.send(resu);
                    })
                    }
                })
                .catch(next)
        }
};

