const { Router } = require("express")

const BrandController = require("../controllers/BrandController");
const brandController = new BrandController();

const brandsRoutes = Router();

brandsRoutes.post("/", brandController.create);
brandsRoutes.get("/", brandController.index);
brandsRoutes.delete("/:id", brandController.delete);
brandsRoutes.get("/:id", brandController.show);
brandsRoutes.put("/:id", brandController.update);






module.exports = brandsRoutes;