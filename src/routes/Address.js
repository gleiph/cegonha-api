const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AddressController = require("../controllers/AdressController")


router.post("/login", AuthController.auth, AuthController.login);
router.post("/address",AuthController.auth, AddressController.create);
router.get("/address", AuthController.auth, AddressController.all);
router.get("/address/:id", AuthController.auth, AddressController.findById);
router.put("/address/:id", AuthController.auth, AddressController.updateById);
router.delete("/address/:id", AuthController.auth, AddressController.deleteById);
router.post("/find", AddressController.findHospital);

module.exports = router;