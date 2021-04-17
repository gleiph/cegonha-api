const CoverAddress = require('../database/models/CoverAddress');

module.exports = {
// ==> Método responsável por listar todos os 'Endereços':
    all(req, res, next) {
        CoverAddress.findAll()
        .then((result) => {
          res.json(result);
        })
        .catch(next);
    },
// ==> Método responsável por criar um novo 'Endereço':
    create(req, res, next) {
        const { street, number_start,  number_end, district, city, uf, cep, id_addres_parto, id_addres_pre_natal } = req.body;
        const errors = []

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

        if(!id_addres_parto) {
            errors.push({error: "id_addres_parto is empty"})
        }

        if(!id_addres_pre_natal) {
            errors.push({error: "id_addres_pre_natal is empty"})
        }
        if (errors.length > 0)
            return res.status(400).json(errors);

        CoverAddress.create({
            street, 
            number_start,  
            number_end, 
            district, 
            city, 
            uf, 
            cep,
            id_addres_parto, 
            id_addres_pre_natal
        })
            .then((result) => {
            res.status(201).json(result); //return with ID -> 201 (CREATED)
            })
            .catch(next);
    },
  
// ==> Método responsável por selecionar 'Endereco' pelo 'id':
    findById(req, res, next) {
        const id = req.params.id;
        CoverAddress.findByPk(id)
        .then(result => {
            res.send(result);
        })
        .catch(next);
        },

// ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
        const id = req.params.id;
        const { street, number_start, number_end, district, city, uf, cep, id_addres_parto, id_addres_pre_natal } = req.body;

        CoverAddress.update({
        street : street, 
        number_start : number_start, 
        number_end : number_end,
        district : district, 
        city : city, 
        uf : uf, 
        cep : cep,
        id_addres_parto: id_addres_parto, 
        id_addres_pre_natal: id_addres_pre_natal
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

        CoverAddress.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).send('deleted successfully a cover address with id = ' + id);
        })
        .catch(next);

        },
};

