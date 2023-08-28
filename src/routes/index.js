const { Router } = require('express');

// Importando as rotas //
const usersRouter = require("./users.routes");
const clientRouter = require("./client.routes");
const usersProducts = require("./products.routes");
const usersCategories = require("./category.routes");
const usersBrands = require("./brand.routes");
const sessionsRoutes = require("./sessions.routes");
const caixaRoutes = require("./caixa.routes");
const checkoutRoutes = require("./checkout.routes");
const saidaRoutes = require("./saida.produtos.routes");






const routes = Router();

// Inicializando o router //

// Aplicando as rotas //
routes.use("/users", usersRouter);
routes.use("/products", usersProducts)
routes.use("/caixa", caixaRoutes);
routes.use("/category", usersCategories);
routes.use("/brand", usersBrands);
routes.use("/sessions", sessionsRoutes);
routes.use("/client", clientRouter);
routes.use("/checkout", checkoutRoutes);
routes.use("/saida-produtos", saidaRoutes);







// Exportando
module.exports = routes;