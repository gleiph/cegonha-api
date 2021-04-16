const express = require("express");
const router = express.Router();

const CarsController = require("../controllers/Cars");
const AuthController = require("../controllers/AuthController") 

router.get("/cars", AuthController.auth, CarsController.all);
router.post("/cars", AuthController.admin, CarsController.create);

module.exports = router;