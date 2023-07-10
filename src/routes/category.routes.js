const { Router } = require("express")

const CategoriesController = require("../controllers/CategoryController");
const categoriesController = new CategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post("/", categoriesController.create);
categoriesRoutes.get("/", categoriesController.index);




module.exports = categoriesRoutes;