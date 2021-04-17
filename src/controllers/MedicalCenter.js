const MedicalCenter = require("../database/models/MedicalCenter");
const bcrypt = require("bcrypt");

module.exports = {
 all(req, res, next) {
    MedicalCenter.findAll()
      .then((result) => {
        res.json(result);
      })
      .catch(next);
  },


  create(req, res, next) {
    const { name, phone, latitude, longitude, id_addres} = req.body;
    MedicalCenter.create({
        name,
        phone,
        latitude, 
        longitude, 
        id_addres
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

    // ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
      const id = req.params.id;
      const { name, phone, latitude, longitude, id_addres } = req.body;

      MedicalCenter.update({
        name : name, 
        phone :  phone, 
        latitude : latitude, 
        longitude : longitude,
        id_addres: id_addres 
         
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