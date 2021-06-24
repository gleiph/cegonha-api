const Contact = require("../database/models/Contact");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;              // biblioteca de operadores

module.exports = {
 all(req, res, next) {
    Contact.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },
  
  create(req, res, next) {
    const { name, phone, phone2, address, email, email2} = req.body;
    const errors = []

        if(!name) {
            errors.push({error: "Name is empty"})
        }

        if(!phone) {
            errors.push({error: "Phone is empty"})
        }

        if(!address) {
          errors.push({error: "Address is empty"})
        }

        if(!email) {
          errors.push({error: "Email is empty"})
        }

        if (errors.length > 0)
            return res.status(400).json(errors);
            
    Contact.create({
        name, 
        phone, 
        phone2, 
        address, 
        email, 
        email2
    })
    
      .then((result) => {
        res.status(201).json(result); //return with ID -> 201 (CREATED)
      })
      .catch(next);
  },

  // ==> Método responsável por selecionar 'Endereco' pelo 'id':
  findById(req, res, next) {
    const id = req.params.id;
    Contact.findByPk(id)
    .then(result => {
        res.send(result);
    })
    .catch(next);
    },

    // ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
      const id = req.params.id;
      const {  name, phone, phone2, address, email, email2 } = req.body;

      Contact.update({
        name : name, 
        phone :  phone, 
        phone2 : phone2,
        address : address, 
        email : email, 
        email2 : email2
        },
      { where: {id: id} }
      )
      .then((result) => {
          res.json(result);
      })
      .catch(next);
      
      },

      // ==> Método responsável por excluir um 'centro médico' pelo 'Id':
    deleteById(req, res, next) {
      const id = req.params.id;

      Contact.destroy({
          where: { id: id }
      }).then(() => {
          res.status(200).send('deleted successfully a contact with id = ' + id);
      })
      .catch(next);

      },

};