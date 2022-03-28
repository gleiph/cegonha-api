const User = require("../database/models/User");
const UserAdress = require('../database/models/UserAdress');
const Adress = require('../database/models/Adress');
const bcrypt = require("bcrypt");
const nodemailer = require('nodemailer'); // Importa o módulo principal

module.exports = {
 all(req, res, next) {
    User.findAll( { include: [ Adress ] } )
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },


  create : async function(req, res, next) {
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

    const NweUser = await User.create({
      username,
      password : bcrypt.hashSync(password, 10),
      name, 
      cpf, 
      email
    })

    const temp = await Adress.findAll({
      where: {
       street: street,
       number: number,
       district: district,
       city: city,
       uf: uf,
       cep: cep
      }
    })
    
    if(temp.length == 0){
      const NewAdress = await Adress.create({
      street: street,
      number: number,
      district: district,
      city: city,
      uf: uf,
      cep: cep
    })
    await UserAdress.create({
      
      idUser: NweUser.id,
      idAdress: NewAdress.id 
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
  }
  else{
    await UserAdress.create({
      
      idUser: NweUser.id,
      idAdress: temp[0].id 
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
  }
},
createUser: async function(req, res, next) {
    const { username, password, name, cpf, email } = req.body;
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

     await User.create({
      username,
      password : bcrypt.hashSync(password, 10),
      name, 
      cpf, 
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
  findByCpf(req, res, next) {
    const cpf = req.params.cpf;
    User.findAll({
      include: [ Adress ],
      where: {
        cpf: cpf
      }
    })
    .then(customer => {
        res.send(customer);
    })
    .catch(next);
    },

    findById(req, res, next) {
      const id = req.params.id;
      User.findAll({
        include: [ Adress ],
        where: {
          id: id
        }
      })
      .then(customer => {
          res.send(customer);
      })
      .catch(next);
      },

    updateByIdUser: async function(req, res, next) {
      const id = req.params.id;
      console.log(id)
      const {name, username, email, cpf} = req.body;
      await User.update({
        name : name, 
        username : username, 
        email: email,
        cpf : cpf
        },
      { where: {id: id} }
      )
      .then((result) => {
          res.json(result)
      })
    },
    // ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById: async function(req, res, next) {
      const id = req.params.id;
      const { username, name, cpf, email, street, number, district, city, uf, cep } = req.body;

      const userAdressTemp1 = await UserAdress.findAll({
        where: {
          idUser: id
        }
      })
    
      const userAdressTemp2 = await UserAdress.findAll({
        where:{
          idAdress: userAdressTemp1[0].idAdress
        }
      })
      
      await User.update({
        username : username, 
        name : name, 
        cpf : cpf, 
        email: email
         
        },
      { where: {id: id} }
      )
      .then( async (result) => {
        
          const temp = await Adress.findAll({
            where:{
              street : street, 
              number : number, 
              district : district, 
              city: city, 
              uf : uf, 
              cep : cep,
            }
          })

           if(temp.length == 0){
            const NewAdress = await Adress.create({
              street: street,
              number: number,
              district: district,
              city: city,
              uf: uf,
              cep: cep
            })
            
            await UserAdress.update({
  
             idAdress: NewAdress.id
            },
            { where: {idUser: id} }
            )  
        }
        else{
           
            await UserAdress.update({
            
            idAdress: temp[0].id
           },
           { where: {idUser: id} }
           ) 
        }
        
        if(userAdressTemp2.length == 0)
        {
          await Adress.destroy({
            where: {
              id: userAdressTemp2[0].id
            }
          })
        }
        
        res.json(result);
      })
      .catch(next);

      },

      // ==> Método responsável por excluir um 'Endereço' pelo 'Id':
    deleteById: async function(req, res, next) {
      const id = req.params.id;
      const temp = await UserAdress.findAll({
        where: {
          idUser: id
        }
      })

      await UserAdress.destroy({
        where: {
          idUser: id
        }
      })

      if(temp.length == 1){
         await Adress.destroy({
             where: {
                 id: temp[0].idAdress
             }
         })
      }

      await User.destroy({
          where: { id: id }
      }).then(() => {
          res.status(200).send('deleted successfully a user with id = ' + id);
      })
      .catch(next);

      },

};