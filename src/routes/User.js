const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/User")


router.post("/login", AuthController.login);
router.post("/user", UserController.create);
router.get("/user", UserController.all);

module.exports = router;