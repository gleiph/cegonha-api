const User = require("../database/models/User");
const bcrypt = require("bcrypt");
module.exports = {
 all(req, res, next) {
    User.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },


  create(req, res, next) {
    const { username, password, name, cpf, id_addres } = req.body;

    User.create({
      username,
      password,
      name, 
      cpf, 
      id_addres
    
    })
    
      .then((result) => {
        bcrypt.hashSync(password, 10),
        res.status(201).json(result); //return with ID -> 201 (CREATED)
      })
      .catch(next);
  },

  // ==> Método responsável por selecionar 'Endereco' pelo 'id':
  findById(req, res, next) {
    const id = req.params.id;
    User.findByPk(id)
    .then(customer => {
        res.send(customer);
    })
    .catch(next);
    },

    // ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
      const id = req.params.id;
      const { username, password, name, cpf, id_addres } = req.body;

      User.update({
        username : username, 
        password : password, 
        name : name, 
        cpf : cpf, 
        id_addres : id_addres
         
        },
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

      User.destroy({
          where: { id: id }
      }).then(() => {
          res.status(200).send('deleted successfully a user with id = ' + id);
      })
      .catch(next);

      },

};