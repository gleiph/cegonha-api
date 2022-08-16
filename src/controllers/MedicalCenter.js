const MedicalCenter = require("../database/models/MedicalCenter");
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;              // biblioteca de operadores

module.exports = {
 all(req, res, next) {
    MedicalCenter.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },
  
  create(req, res, next) {
    const { name, phone, latitude, longitude, image, street, number, district, city, uf, cep} = req.body;
    const errors = []

        if(!name) {
            errors.push({error: "Name is empty"})
        }

        if(!street) {
            errors.push({error: "Street is empty"})
        }

        if(!number) {
          errors.push({error: "Number is empty"})
        }

        if(number != 's/n' && isNaN(number) == true ){
          errors.push({error: "Number is invalid! Enter numbers only or y/n for addresses without number"})
        }else{
          if(parseInt(number) < 0){
            errors.push({error: "Number is ivalid! Enter only positive numbers"})
          }
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

        if (errors.length > 0)
            return res.status(400).json(errors);
            
    MedicalCenter.create({
        name,
        phone: phone.replace(/\D/g, ""),
        latitude, 
        longitude, 
        image,
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
    MedicalCenter.findByPk(id)
    .then(result => {
        res.send(result);
    })
    .catch(next);
    },
  // ==> Método responsável por listar hospitais por nome':
  findByName(req, res, next) {
    const name = req.params.name;
    MedicalCenter.findAll({
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
      const { name, phone, latitude, longitude, image, street, number, district, city, uf, cep } = req.body;

      MedicalCenter.update({
        name : name, 
        phone :  phone.replace(/\D/g, ""), 
        latitude : latitude, 
        longitude : longitude,
        image: image,
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

      // ==> Método responsável por excluir um 'centro médico' pelo 'Id':
    deleteById(req, res, next) {
      const id = req.params.id;

      MedicalCenter.destroy({
          where: { id: id }
      }).then(() => {
          res.status(200).send('deleted successfully a Medical Center with id = ' + id);
      })
      .catch(next);

      },

};