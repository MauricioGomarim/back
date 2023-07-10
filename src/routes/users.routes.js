 // manipular imagem
//  const multer = require("multer");
//  const uploadConfig = require("../configs/upload")

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const  {Router}  = require("express");
const UsersController = require("../controllers/UsersController")
const usersController = new UsersController();

const usersRoutes = Router();
// const upload = multer(uploadConfig.MULTER)

usersRoutes.post('/', usersController.create);
usersRoutes.put('/', ensureAuthenticated, usersController.update);




module.exports = usersRoutes;