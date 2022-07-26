const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const UserController = require("../controllers/User");


router.post("/login",AuthController.login);
router.post("/user", UserController.create);
router.post("/user2", UserController.createUser);
router.get("/user", AuthController.admin, UserController.all);
router.get("/userCpf/:cpf", UserController.findByCpf);
router.get("/user/:name", UserController.findByName);
router.get("/userId/:id", UserController.findById);
router.put("/user/:id", AuthController.auth, UserController.updateById);
router.put("/user2/:id", UserController.updateByIdUser);
router.delete("/user/:id",  AuthController.admin, UserController.deleteById);
router.post("/forgot_password", AuthController.forgot_password);
router.post("/reset_password/:id", AuthController.auth,AuthController.reset_password);

module.exports = router;