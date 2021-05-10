const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer') // Importa o módulo principal

module.exports = {
 all(req, res, next) {
    User.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },


  create(req, res, next) {
    const { username, password, name, cpf, email, street, number, district, city, uf, cep } = req.body;
    const errors = []

    if(!username) {
        errors.push({error: "Username is empty"})
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

    if(!email) {
      errors.push({error: "Email is empty"})
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
      password : bcrypt.hashSync(password, 10),
      name, 
      cpf, 
      street, 
      number, 
      district, 
      city, 
      uf, 
      cep,
      email
    
    })
    
      .then((result) => {
        const transporter = nodemailer.createTransport({ // Configura os parâmetros de conexão com servidor.
          service: "gmail",
          secure: false,
          port: 25,
            auth: {
              user: "walkiria.garcia@ice.ufjf.br",
              pass: "04deAgosto"
            }
        })
        const mailOptions = { // Define informações pertinentes ao E-mail que será enviado
          from: 'walkiria.garcia@ice.ufjf.br',
          to: email,
          subject: 'Cadastro no aplicativo cegonha',
          html: '<div style="background-color: #E0FFFF; color: #363636; text-align: center; margin-right: 5%; margin-left:5%"><h1 style=" padding-top: 50px">Olá ' + name + '! </h1><h3> Este email é para te informar que o seu cadastro no aplicativo rede cegonha foi realizado com sucesso</h3><h3 style=" padding-bottom: 50px"> Acesse sua conta com o usuário  '  +username +'</h3></div>'
         
        }
        transporter.sendMail(mailOptions, (err, info) => { // Função que, efetivamente, envia o email.
          if (err) {
            return console.log(err)
          }
          return res.status(200).json({ message: "A new password was sent to email "+ email });
        })

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
      const { username, name, cpf, email, street, number, district, city, uf, cep } = req.body;

      User.update({
        username : username, 
        name : name, 
        cpf : cpf, 
        street : street, 
        number : number, 
        district : district, 
        city: city, 
        uf : uf, 
        cep : cep,
        email:email
         
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