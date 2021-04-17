const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const AddressController = require("../controllers/AdressController")

router.post("/address",AuthController.auth, AddressController.create);
router.get("/address", AuthController.auth, AddressController.all);
router.get("/address/:id", AuthController.auth, AddressController.findById);
router.put("/address/:id", AuthController.auth, AddressController.updateById);
router.delete("/address/:id", AuthController.admin, AddressController.deleteById);
router.post("/find-center-medical", AuthController.auth, AddressController.findCenterMedical);

module.exports = router;