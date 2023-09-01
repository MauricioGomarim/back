const { Router } = require("express")

const ControllerProdutosFinalizados = require("../controllers/ControllerProdutosFinalizados");
const controllerProdutosFinalizados = new ControllerProdutosFinalizados();

const pedidosFinalizadosRoutes = Router();


pedidosFinalizadosRoutes.get("/", controllerProdutosFinalizados.index);














module.exports = pedidosFinalizadosRoutes;