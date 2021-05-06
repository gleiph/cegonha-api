const Messages = require("../database/models/Messages");
const { Sequelize } = require("sequelize");
const nodemailer = require('nodemailer') // Importa o módulo principal

module.exports = {
 all(req, res, next) {
    Messages.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },

  create(req, res, next) {
    const { name, email, message} = req.body;
    const errors = []

        if(!name) {
            errors.push({error: "Name is empty"})
        }

        if(!email) {
            errors.push({error: "Email is empty"})
        }

        if(!message) {
          errors.push({error: "Message is empty"})
        }

        if (errors.length > 0)
            return res.status(400).json(errors);
            
    Messages.create({
        name,
        email, 
        message
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
            from: email,
            to: 'walkiria.garcia@ice.ufjf.br',
            subject: 'Sugestões/Reclamações App rede cegonha',
            text: message
           
          }
          transporter.sendMail(mailOptions, (err, info) => { // Função que, efetivamente, envia o email.
            if (err) {
              return console.log(err)
            }
            return res.status(200).json({ message: "A new password was sent to email "+ email });
          })

        res.status(201).json(result); //return with ID -> 201 (CREATED)
      })
      .catch(next);
  },

  // ==> Método responsável por selecionar 'Mensagem' pelo 'id':
  findById(req, res, next) {
    const id = req.params.id;
    Messages.findByPk(id)
    .then(result => {
        res.send(result);
    })
    .catch(next);
    },

};