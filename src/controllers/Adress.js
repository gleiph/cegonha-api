const Adress = require("../database/models/Adress");
const UserAdress = require('../database/models/UserAdress');
const User = require('../database/models/User'); 


module.exports = {
      create : async function(req, res, next){
    
         const {cpfUser, street, number, district, city, uf, cep} = req.body;
         

         const idUser = await User.findAll({
            where: {
               cpf: cpfUser
            }
         })
         const adressTemp = await Adress.findAll({
             where: {
                 street: street,
                 number: number,
                 district: district,
                 city: city,
                 uf: uf,
                 cep: cep,
             }
         })
     

         if(adressTemp.length > 0){
            const userAdresTemp = await UserAdress.findAll({
               where: {
                  idUser: idUser[0].id,
                  idAdress: adressTemp[0].id 
               }
            })
            if(userAdresTemp.length > 0)
            {
               return res.status(400).send({error: 'User already has this address'});
            }
            else{
               await UserAdress.create({
                  idUser: idUser[0].id,
                  idAdress: adressTemp[0].id 
               })
               .then((result) => {
                  res.status(201).json(result); //return with ID -> 201 (CREATED)
               })
               .catch(next);
            }
         }
         else{
             const newAdress = await Adress.create({
                street: street,
                number: number,
                district: district,
                city: city,
                uf: uf,
                cep: cep,
             })
             await UserAdress.create({
                idUser: idUser[0].id,
                idAdress: newAdress.id 
             })
             .then((result) => {
                res.status(201).json(result); //return with ID -> 201 (CREATED)
              })
              .catch(next);
                
         }
      },

      all : async function(req, res, next){
         Adress.findAll()
         .then((result) => {
           res.json(result);
         })
         .catch(next);
      },

      findById(req, res, next) {
         const id = req.params.id;
         Adress.findAll({
           where: {
             id: id
           }
         })
         .then(customer => {
             res.send(customer);
         })
         .catch(next);
         },

      updateId : async function(req, res, next){
         const idAdress = req.params.idAdress;
         const idUser = req.params.idUser;
        
         const { street, number, district, city, uf, cep } = req.body;
 
     
         const userAdressTemp2 = await UserAdress.findAll({
           where:{
             idAdress: idAdress
           }
         })
       
         
        
           
         const temp = await Adress.findOne({
            where:{
            street : street, 
            number : number, 
            district : district, 
            city: city, 
            uf : uf, 
            cep : cep,
         }
         })
        
         try{
              
               if(temp == null){
                 
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
                   { where: {
                      idUser: idUser,
                      idAdress: idAdress
                  } })
                 
               }
               else{
                  
                    await UserAdress.update({
                    idAdress: temp.id
                    },
                    { where: {
                       idUser: idUser,
                       idAdress: idAdress
                  
                  } })
                   }
                  
               if(userAdressTemp2.length == 1)
               {
                  await Adress.destroy({
                  where: {
                  id: idAdress
               }
               })}
               res.json('Endereço editado com sucesso');
         }
         catch(err){
            res.json(err);
         }

      },

      deleteById: async function(req, res, next) {
         const idAdress = req.params.idAdress;
         const idUser = req.params.idUser;
         try{
            const temp = await UserAdress.findAll({
               where: {
                  idAdress: idAdress
           }
         })
   
            await UserAdress.destroy({
               where: {
               idUser: idUser,
               idAdress: idAdress
               }
            })
            if(temp.length == 1){
               await Adress.destroy({
                  where: {
                    id: temp[0].idAdress
                  }
            })}
            res.status(200).send('deleted successfully a user with id = ' + idAdress);
          }
          catch(err){
             console.log(err)
             next
         }
     
         },
       
}