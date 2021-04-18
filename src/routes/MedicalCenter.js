const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const MedicalCenterController = require("../controllers/MedicalCenter")

router.post("/medical-center", AuthController.admin, MedicalCenterController.create);
router.get("/medical-center", MedicalCenterController.all);
router.get("/medical-center/:id", MedicalCenterController.findById);
router.get("/medical-center-name/:name", MedicalCenterController.findByName);
router.put("/medical-center/:id",  AuthController.admin, MedicalCenterController.updateById);
router.delete("/medical-center/:id",  AuthController.admin, MedicalCenterController.deleteById);


module.exports = router;