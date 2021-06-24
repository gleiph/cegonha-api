const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const CoverAddressController = require("../controllers/CoverAddress")

router.post("/cover-address", AuthController.admin, CoverAddressController.create);
router.get("/cover-address", CoverAddressController.all);
router.get("/cover-address/:id", CoverAddressController.findById);
router.get("/cover-address-street/:street", CoverAddressController.findByStreet);
router.put("/cover-address/:id", AuthController.admin, CoverAddressController.updateById);
router.delete("/cover-address/:id", AuthController.admin, CoverAddressController.deleteById);
router.post("/find-center-medical", CoverAddressController.findCenterMedical);

module.exports = router;