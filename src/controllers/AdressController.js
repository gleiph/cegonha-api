const Address = require('../database/models/Address');

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
        findHospital (req, res, next)  {
            const { street, number, district, city, uf, cep } = req.body;

        Address.findByPk(
            'SELECT * FROM CoverAddress WHERE street = $1 and number_start <= $2 and number_end >= $2 and cep = $3 and district = $4 and city = $5 and uf = $6',
            [street, number, district, city, uf, cep],
        );
        
        }
};

