const { Router } = require("express")
const multer = require('multer');
const uploadConfig = require('../configs/upload');
const CaixaController = require("../controllers/CaixaController");
const caixaController = new CaixaController();

const upload = multer(uploadConfig.MULTER);

const caixaRoutes = Router();

caixaRoutes.post("/", upload.single("image"), caixaController.create);
caixaRoutes.put("/:id", upload.single("image"), caixaController.update);
caixaRoutes.delete("/:id", caixaController.delete);
caixaRoutes.get("/", caixaController.index);
caixaRoutes.get("/:id", caixaController.show);







module.exports = productsRoutes;