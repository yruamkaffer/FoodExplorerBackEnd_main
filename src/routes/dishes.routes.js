// Importando
const { Router } = require('express');

// Importando e Instanciando o controller
const DishesController = require('../controllers/DishesController');

// Inicializando
const dishesRoutes = Router();

// Importando Middleware de autenticação
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const dishesController = new DishesController();


// Passando o middleware
dishesRoutes.use(ensureAuthenticated)

dishesRoutes.get('/', dishesController.index);
dishesRoutes.get('/:id', dishesController.show);


// Exportando
module.exports = dishesRoutes;