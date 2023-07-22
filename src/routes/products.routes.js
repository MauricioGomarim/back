const { Router } = require("express")
const multer = require('multer');
const uploadConfig = require('../configs/upload');
const ProductsController = require("../controllers/ProductsController");
const productsController = new ProductsController();

const upload = multer(uploadConfig.MULTER);

const productsRoutes = Router();

productsRoutes.post("/", upload.single("image"), productsController.create);
productsRoutes.put("/:id", upload.single("image"), productsController.update);
productsRoutes.delete("/:id", productsController.delete);
productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);







module.exports = productsRoutes;