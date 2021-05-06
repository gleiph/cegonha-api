const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const MessageController = require("../controllers/Messages")

router.post("/message", MessageController.create);
router.get("/message", AuthController.admin, MessageController.all);
router.get("/message/:id", AuthController.admin, MessageController.findById);


module.exports = router;