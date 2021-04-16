const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const CoverAddressController = require("../controllers/CoverAddress")

router.post("/cover-address", AuthController.admin, CoverAddressController.create);
router.get("/cover-address", AuthController.auth, CoverAddressController.all);
router.get("/cover-address/:id", AuthController.auth, CoverAddressController.findById);
router.put("/cover-address/:id", AuthController.admin, CoverAddressController.updateById);
router.delete("/cover-address/:id", AuthController.admin, CoverAddressController.deleteById);

module.exports = router;