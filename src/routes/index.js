const { Router } = require('express');

// Importando as rotas //
const usersRouter = require("./users.routes");
const usersProducts = require("./products.routes");
const usersCategories = require("./category.routes");
const usersBrands = require("./brand.routes");
const sessionsRoutes = require("./sessions.routes");




const routes = Router();

// Inicializando o router //

// Aplicando as rotas //
routes.use("/users", usersRouter);
routes.use("/products", usersProducts);
routes.use("/category", usersCategories);
routes.use("/brand", usersBrands);
routes.use("/sessions", sessionsRoutes);




// Exportando
module.exports = routes;