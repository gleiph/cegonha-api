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
    const { username, password, name, cpf, street, number, district, city, uf, cep } = req.body;
    const errors = []

    if(!username) {
        errors.push({error: "Username is empty"})
    }

    if(!street) {
      errors.push({error: "Street is empty"})
    }

    if(!district) {
      errors.push({error: "District is empty"})
    }

    if(!city) {
      errors.push({error: "City is empty"})
    }

    if(!uf) {
        errors.push({error: "UF is empty"})
    }

    if(!cep) {
      errors.push({error: "CEP is empty"})
    } 

    if(!password) {
        errors.push({error: "Password is empty"})
    }

    if(!name) {
        errors.push({error: "Name is empty"})
    }

    if(!cpf) {
        errors.push({error: "CPF is empty"})
    }

    if (errors.length > 0)
        return res.status(400).json(errors);

    User.findAll({
      where: {
        cpf: cpf
        }
      })
      .then((result) => {
        if(result != ""){
          return res.status(400).send({error: 'CPF already exists'});
        }
      })
    User.findAll({
      where: {
        username: username
        }
      })
      .then((result) => {
        if(result != ""){
          return res.status(400).send({error: 'Username already exists'});
        }
      })

    User.create({
      username,
      password: bcrypt.hashSync("123", 10),
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

  // ==> Método responsável por selecionar 'usuario' pelo 'cpf':
  findById(req, res, next) {
    const cpf = req.params.cpf;
    User.findAll({
      where: {
        cpf: cpf
      }
    })
    .then(customer => {
        res.send(customer);
    })
    .catch(next);
    },

    // ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
      const id = req.params.id;
      const { username, password, name, cpf, street, number, district, city, uf, cep } = req.body;

      User.update({
        username : username, 
        password : password, 
        name : name, 
        cpf : cpf, 
        street : street, 
        number : number, 
        district : district, 
        city: city, 
        uf : uf, 
        cep : cep
         
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