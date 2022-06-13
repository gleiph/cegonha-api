const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const Neighborhoods = require("../controllers/Neighborhoods");

router.post("/neighborhood", AuthController.admin, Neighborhoods.create);
router.get("/neighborhood", Neighborhoods.all);

module.exports = router;
