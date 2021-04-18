const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AddressController = require("../controllers/AdressController")

router.post("/address",AuthController.auth, AddressController.create);
router.get("/address", AddressController.all);
router.get("/address/:id", AddressController.findById);
router.put("/address/:id", AuthController.auth, AddressController.updateById);
router.delete("/address/:id", AuthController.admin, AddressController.deleteById);
router.post("/find-center-medical", AddressController.findCenterMedical);

module.exports = router;