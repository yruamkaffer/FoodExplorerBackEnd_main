// Importando o knex para conexão com o db
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage")

class DishImageController{
    async update(request, response){
        // Pegando o id do prato que terá a sua imagem alterada
        const { id } = request.params;

        // Pegando o nome do arquivo
        const dishFilename = request.file.filename;

        // Instanciando o diskstorage
        const diskStorage = new DiskStorage()

        // Buscando na tabeça dishes o id do prato
        const dish = await knex("dishes").where({ id }).first();

        // Se existir uma imagem para o prato
        if(dish.image){
            // Deletando a imagem do prato antiga
            await diskStorage.deleteFile(dish.image);
        }

        // Caso ainda não exista
        const filename = await diskStorage.saveFile(dishFilename);
        dish.image = filename;


        // Salvando no db somente o campo do prato específico
        await knex("dishes").update(dish).where({ id });

        return response.json(dish);

    }
}

module.exports = DishImageController;
