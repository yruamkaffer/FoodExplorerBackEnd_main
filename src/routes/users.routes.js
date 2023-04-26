// Importando
const { Router } = require('express');
const multer = require('multer');
const uploadAvatarConfig = require('../configs/uploadAvatar')

// Importando e Instanciando o controller
const UsersController = require('../controllers/UsersController');
const UserAvatarController = require('../controllers/UserAvatarController');

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// Importando Middleware de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

// Inicializando
const usersRoutes = Router();
const upload = multer(uploadAvatarConfig.MULTER);

// Rotas
// Não é preciso usar mais o '/users' só a '/' já funciona
// Não é preciso passar (request, response) só o método que tem dentro da controller
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)

usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.update)

// Exportando
module.exports = usersRoutes;