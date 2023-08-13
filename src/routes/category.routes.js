const { Router } = require("express")

const CategoriesController = require("../controllers/CategoryController");
const categoriesController = new CategoriesController();

const categoriesRoutes = Router();

categoriesRoutes.post("/", categoriesController.create);
categoriesRoutes.get("/", categoriesController.index);

categoriesRoutes.delete("/:id", categoriesController.delete);
categoriesRoutes.get("/:id", categoriesController.show);
categoriesRoutes.put("/:id", categoriesController.update);


module.exports = categoriesRoutes;