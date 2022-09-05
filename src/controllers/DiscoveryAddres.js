const DiscoveryAddress = require("../database/models/DiscoveryAddres");
const Region = require("../database/models/Region");
const Neighborhoods = require("../database/models/Neighborhoods");


module.exports = {
    // ==> Método responsável por listar todos os 'Endereços':
    all(req, res, next) {
        DiscoveryAddress.findAll()
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    },
    // ==> Método responsável por criar um novo 'Endereço':
    create(req, res, next) {
        const { district, region, city, uf, id_addres_parto, id_addres_pre_natal } =
            req.body;
        const errors = [];
        if (!district) {
            errors.push({ error: "District is empty" });
        }

        if (!region) {
            errors.push({ error: "Region is empty" });
        }

        if (!city) {
            errors.push({ error: "City is empty" });
        }

        if (!uf) {
            errors.push({ error: "UF is empty" });
        }

        if (!id_addres_parto) {
            errors.push({ error: "id_addres_parto is empty" });
        }

        if (!id_addres_pre_natal) {
            errors.push({ error: "id_addres_pre_natal is empty" });
        }
        if (errors.length > 0) return res.status(400).json(errors);
        DiscoveryAddress.create({
            region,
            city,
            uf,
            id_addres_parto,
            id_addres_pre_natal,
        })
            .then((result) => {
                const discovery_address_id = result.id
                district.forEach(async element => {
                    const neighborhood = await Neighborhoods.findOne({
                        where: { name: element },
                    });
                    const neighborhood_id = neighborhood.id
                    const name = region
                    Region.create({
                        name,
                        neighborhood_id,
                        discovery_address_id,
                    })
                });
                res.send(201).send("sucesso");
            })
            .catch(next);
    },


    // ==> Método responsável por selecionar 'Endereco' pelo 'id':
    findById(req, res, next) {
        const id = req.params.id;
        DiscoveryAddress.findByPk(id)
            .then((result) => {
                res.send(result);
            })
            .catch(next);
    },
    findByNeighborhood: async function (req, res, next){
        const neighborhood = req.params.neighborhood
        const idNeighborhood = await Neighborhoods.findOne({
            where: {
                name: neighborhood,
            }
        })
        if(idNeighborhood === null)
            return res.status(400).json('Neighborhood not found')

        Region.findOne({
           where: {
            neighborhood_id: idNeighborhood.id
           } 
        }).then((result)=> {
            DiscoveryAddress.findByPk(result.id)
            .then((result) => {
                res.send(result);
            })
            .catch(next);
        })

    },

    // ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById(req, res, next) {
        const id = req.params.id;
        const {
            district,
            region,
            city,
            uf,
            cep,
            id_addres_parto,
            id_addres_pre_natal,
        } = req.body;

        DiscoveryAddress.update(
            {
                region: region,
                district: district,
                city: city,
                uf: uf,
                cep: cep,
                id_addres_parto: id_addres_parto,
                id_addres_pre_natal: id_addres_pre_natal,
            },
            { where: { id: id } }
        )
            .then((result) => {
                res.json(result);
            })
            .catch(next);
    },

    // ==> Método responsável por excluir um 'DiscoveryAddress' pelo 'Id':
    deleteById(req, res, next) {
        const id = req.params.id;

        Region.destroy({
            where: {discovery_address_id: id},
        }).then(() => {
            
            })
            .catch((err)=>{
               res.send(result)
            });
        DiscoveryAddress.destroy({
            where: { id: id },
        })
            .then(() => {
                res
                    .status(200)
                    .send("deleted successfully a Discovery Address with id = " + id);
            })
            .catch((err)=>{
               res.send(result)
            });
            
    },
};
