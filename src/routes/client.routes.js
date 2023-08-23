const { Router } = require("express")

const ClientController = require("../controllers/ClientController");
const clientController = new ClientController();

const clientsRoutes = Router();

clientsRoutes.post("/", clientController.create);
clientsRoutes.put("/:id", clientController.update);
clientsRoutes.get("/", clientController.index);
clientsRoutes.get("/:id", clientController.show);
clientsRoutes.delete("/:id", clientController.delete);











module.exports = clientsRoutes;