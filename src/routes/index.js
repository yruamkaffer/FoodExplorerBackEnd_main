// Importando da biblioteca
const { Router } = require('express');

// Importando as Rotas
const usersRoutes = require('./users.routes');
const dishesRoutes = require('./dishes.routes')
const dishesAdminRoutes = require('./dishesAdmin.routes')
const sessionsRoutes = require('./sessions.routes')

// Inicializando 
const routes = Router();


// Centralizando todas as rotas da aplicação

// Quando o usuário chamar pela rota /users, ele será redirecionado para o users.routes.js
routes.use('/users', usersRoutes);
routes.use('/dishes', dishesRoutes);
routes.use('/adminDishes', dishesAdminRoutes);
routes.use('/sessions', sessionsRoutes);


// Exportando
module.exports = routes;