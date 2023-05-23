const DiscoveryAddress = require("../database/models/DiscoveryAddres");
const Region = require("../database/models/Region");
const Neighborhoods = require("../database/models/Neighborhoods");


module.exports = {
    // ==> Método responsável por listar todos os 'Endereços':
    all(req, res, next) {
        DiscoveryAddress.findAll({
            include: Neighborhoods,
            order: [
                ["region", "ASC"],
                [Neighborhoods, "name", "ASC"],
            ],
        })
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
                const discoveyAddressId = result.id
                district.forEach(async element => {
                    console.log(element)
                    await Neighborhoods.update(
                        {
                            discoveyAddressId: discoveyAddressId
                        },
                        { where: { name: element } }
                    )
                });
                res.send(201).json("sucesso");
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
    findByNeighborhood: async function (req, res, next) {
        const neighborhood = req.params.neighborhood
        const idNeighborhood = await Neighborhoods.findOne({
            where: {
                name: neighborhood,
            }
        })
        if (idNeighborhood === null)
            return res.status(400).json('Neighborhood not found')

        Region.findOne({
            where: {
                neighborhood_id: idNeighborhood.id
            }
        }).then((result) => {
            DiscoveryAddress.findByPk(result.id)
                .then((result) => {
                    res.send(result);
                })
                .catch(next);
        })

    },

    // ==> Método responsável por atualizar um 'Endereço' pelo 'id':
    updateById: async function (req, res, next) {
        let final = [];
        const id = req.params.id;
        const {
            city,
            uf,
            region,
            on,
            off,
            id_addres_parto,
            id_addres_pre_natal,
        } = req.body;
        console.log(on);
        console.log(off);
        DiscoveryAddress.update(
            {
                region: region,
                //district: district,
                city: city,
                uf: uf,
                id_addres_parto: id_addres_parto,
                id_addres_pre_natal: id_addres_pre_natal,
            },
            { where: { id: id } }
        )
            .then((result) => {
                final = result;
                if (on) {
                    on.forEach(async (element) => {
                        let district = await Neighborhoods.findOne({ where: { name: element } })
                        if (district) {
                            if (district.discoveyAddressId == null) {
                                await Neighborhoods.update({
                                    discoveyAddressId: id
                                },
                                    { where: { name: element } }
                                )
                                    .then((result) => {
                                        console.log('bairros adicionados:')
                                        console.log(result)
                                    })
                                    .catch(next);
                            }
                        }
                    });
                }
                if (off) {
                    off.forEach(async (element) => {
                        await Neighborhoods.destroy({
                            where: { name: element }
                        }).then((result) => {
                            console.log('bairros retirados:')
                            console.log(result)
                        })
                            .catch(next);
                    });
                };
                res.json(final);
            })
            .catch(next);
    },

    // ==> Método responsável por excluir um 'DiscoveryAddress' pelo 'Id':
    deleteById(req, res, next) {
        const id = req.params.id;
        Neighborhoods.destroy({
            where: { discoveyAddressId: id }
        }).then(console.log('Bairros deletados'))
        .catch((err) => {
            console.log(err);
        });
        DiscoveryAddress.destroy({
            where: { id: id },
        })
            .then(() => {
                res
                    .status(200)
                    .send("deleted successfully a Discovery Address with id = " + id);
            })
            .catch((err) => {
                console.log(err);
                res.send(err)
            });

    },
};
