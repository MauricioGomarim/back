const { Router } = require("express")

const ControllerSaidaProdutos = require("../controllers/ControllerSaidaProdutos");
const controllerSaidaProdutos = new ControllerSaidaProdutos();

const saidaRoutes = Router();


saidaRoutes.get("/", controllerSaidaProdutos.index);












module.exports = saidaRoutes;