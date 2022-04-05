const express = require("express");
const router = express.Router();

const AdressControler = require("../controllers/Adress");


router.post("/adress",AdressControler.create);
router.get("/adress",AdressControler.all);
router.get("/adress/:id",AdressControler.findById);
router.put("/adress/:idAdress/:idUser",AdressControler.updateId);
router.delete("/adress/:idAdress/:idUser",AdressControler.deleteById);





module.exports = router;