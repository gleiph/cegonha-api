const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const Neighborhoods = require("../controllers/Neighborhoods");

router.post("/neighborhood"/*, AuthController.admin*/, Neighborhoods.create);
router.get("/neighborhood", Neighborhoods.all);
router.get("/neighborhood/:id", Neighborhoods.findByIdSiscoveryAddress);
router.put("/neighborhood", Neighborhoods.updateIdDiscoveryAddress);
router.get("/neighborhood-name/:name", Neighborhoods.findByName);

module.exports = router;
