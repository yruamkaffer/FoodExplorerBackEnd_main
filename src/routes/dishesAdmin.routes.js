// Importando
const { Router } = require('express');

// Importando a Biblioteca MULTER para o carregamento de imagens e as configs
const multer = require('multer');
const uploadConfig = require('../configs/upload')

// Importando e Instanciando o controller
const DishesAdminController = require('../controllers/DishesAdminController');
const DishImageController = require('../controllers/DishImageController')

// Inicializando
const dishesAdminRoutes = Router();
const upload = multer(uploadConfig.MULTER)

const dishesAdminController = new DishesAdminController();
const dishImageController = new DishImageController()

// ROTAS
dishesAdminRoutes.post('/', upload.single("image"), dishesAdminController.create);
dishesAdminRoutes.delete('/:id', dishesAdminController.delete)
dishesAdminRoutes.put('/:id', dishesAdminController.update)

// Rota para carregamento da imagem
dishesAdminRoutes.patch('/dishImage/:id', upload.single("image"), dishImageController.update)

module.exports = dishesAdminRoutes;