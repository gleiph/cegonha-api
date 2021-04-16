const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/User")


router.post("/login", AuthController.login);
router.post("/user", AuthController.auth, UserController.create);
router.get("/user", AuthController.admin, UserController.all);
router.get("/user/:id", AuthController.auth, UserController.findById);
router.put("/user/:id", AuthController.auth, UserController.updateById);
router.delete("/user/:id",  AuthController.admin, UserController.deleteById);


module.exports = router;