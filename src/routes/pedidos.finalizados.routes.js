const { Router } = require("express")

const ControllerProdutosFinalizados = require("../controllers/ControllerProdutosFinalizados");
const controllerProdutosFinalizados = new ControllerProdutosFinalizados();

const pedidosFinalizadosRoutes = Router();


pedidosFinalizadosRoutes.get("/", controllerProdutosFinalizados.index);
pedidosFinalizadosRoutes.get("/:id", controllerProdutosFinalizados.show);















module.exports = pedidosFinalizadosRoutes;