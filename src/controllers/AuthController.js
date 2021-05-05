const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Bearer } = require("permit");
const { Basic } = require("permit");
const crypto = require("crypto");
const nodemailer = require('nodemailer') // Importa o módulo principal
const User = require("../database/models/User");

const permit = new Bearer();

module.exports = {
    login(req, res, next) {
        const { username, password } = req.body;
    
        User.findOne({
          where: {
            username: username,
          },
        }).then((user) => {
          //username does not exists
          if (!user) return res.status(401).json({ error: "username not found" });
    
          //password check
          if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "invalid password" });
          }
    
          //generate & sign token
          let jwtPayload = { username: user.username }; //public payload!
          let token = jwt.sign(jwtPayload, process.env.JWT_SECRET); //user: user
          return res.status(200).json({ token, username });
        });
      },

      auth(req, res, next) {
        // Try to find the bearer token in the request.
        const token = permit.check(req);
    
        // No token found, so ask for authentication.
        if (!token) {
          permit.fail(res);
          return res.status(401).json({ error: "authentication required!" });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            permit.fail(res);
            return res.status(401).json({ error: "failed to authenticate token!" });
          }
    
          //save username for next middleware
          req.username = decoded.username;
          next();
        });
      },

      admin(req, res, next) {
        // Try to find the bearer token in the request.
        const token = permit.check(req);
        // No token found, so ask for authentication.
        if (!token) {
          permit.fail(res);
          return res.status(401).json({ error: "authentication required!" });
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            permit.fail(res);
            return res.status(401).json({ error: "failed to authenticate token!" });
          }
    
          //save username for next middleware
          req.username = decoded.username;
          if (req.username != 'admin') {
            permit.fail(res);
            return res.status(401).json({ error: "user without access!" });
          }
          next();
        });
      },

      forgot_password(req, res, next){
        const {email} = req.body;
        try{  
          User.findOne({
            where: {
              email: email,
            },
          }).then((user) => {
            //username does not exists
            if (!user) return res.status(401).json({ error: "User not found" });
          });

            const newPassword = crypto.randomBytes(4).toString('hex');
            const cripPassword = bcrypt.hashSync(newPassword, 10);

            User.update({
              password: cripPassword,
              },
            { where: {email: email} }
            )
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
              subject: 'Redefinição de senha aplicativo cegonha',
              html: '<div style="background-color: black; color: white; text-align: center"><h1>Senha alterada</h1><p> Você solicitou a mudança de senha do <h1>App Cegonha</h1>  Sua nova senha é:</p><h1 style="background-color: green; color: white">'+ newPassword +'</h1><p> É recomendado modificar sua senha assim que acessar o aplicativo novamente </p> </div>'
             
            }
            transporter.sendMail(mailOptions, (err, info) => { // Função que, efetivamente, envia o email.
              if (err) {
                return console.log(err)
              }
              return res.status(200).json({ message: "A new password was sent to email "+ email });
            })
           

        } catch(err){
          console.log(err)
          res.status(400).send({ error: "Erro on forgot password, try again"});
        }
      },
      
      reset_password(req, res, next){
        const id = req.params.id;
        const {password, newPassword} = req.body;

        User.findOne({
          where: {
            id: id,
          },
        }).then((user) => {
          //password check
          if (!bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ error: "invalid password" });
          }
        });
        User.update({
          password : bcrypt.hashSync(newPassword, 10), 
          },
        { where: {id: id} }
        )
        .then((result) => {
          return res.status(201).json({ message: "Password changed successfully" });
        })
        .catch(next);
        
        },

};
