// Importando depêndencias
const { Router } = require('express');

// Importando o controller
const SessionsController = require('../controllers/SessionsController');

// Instânciando
const sessionsController = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post('/', sessionsController.create);

module.exports = sessionsRoutes;