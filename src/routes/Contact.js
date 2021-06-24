const express = require("express");
const router = express.Router();

const AuthController = require("../controllers/AuthController");
const ContactController = require("../controllers/Contact")

router.post("/contact", AuthController.admin, ContactController.create);
router.get("/contact", ContactController.all);
router.get("/contact/:id", ContactController.findById);
router.put("/contact/:id",  AuthController.admin, ContactController.updateById);
router.delete("/contact/:id",  AuthController.admin, ContactController.deleteById);


module.exports = router;