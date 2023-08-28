const { Router } = require("express")
const CheckoutController = require("../controllers/CheckoutController");
const checkoutController = new CheckoutController();


const checkoutRoutes = Router();

checkoutRoutes.post("/", checkoutController.create);








module.exports = checkoutRoutes;