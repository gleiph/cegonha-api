const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const DiscoveryAddresController = require("../controllers/DiscoveryAddres")

router.post("/discovery-address",AuthController.admin, DiscoveryAddresController.create);
router.get("/discovery-address", DiscoveryAddresController.all);
router.get("/discovery-address/:id", DiscoveryAddresController.findById);
router.get("/discovery-addressNh/:neighborhood", DiscoveryAddresController.findByNeighborhood);
router.put("/discovery-address/:id", AuthController.admin, DiscoveryAddresController.updateById);
router.delete("/discovery-address/:id", AuthController.admin, DiscoveryAddresController.deleteById);

module.exports = router;