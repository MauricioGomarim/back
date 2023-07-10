const { Router } = require("express")

const BrandController = require("../controllers/BrandController");
const brandController = new BrandController();

const brandsRoutes = Router();

brandsRoutes.post("/", brandController.create);
brandsRoutes.get("/", brandController.index);




module.exports = brandsRoutes;