const { Router } = require("express")

const ProductsController = require("../controllers/ProductsController");
const productsController = new ProductsController();

const productsRoutes = Router();

productsRoutes.post("/", productsController.create);
productsRoutes.put("/:id", productsController.update);
productsRoutes.delete("/:id", productsController.delete);
productsRoutes.get("/", productsController.index);
productsRoutes.get("/:id", productsController.show);







module.exports = productsRoutes;