const knex = require ('../database/knex');

class DishesController{
    async show(request, response){
        // pegando o id do prato que é passado como parâmetro
        const { id } = request.params;

        // Fazendo a busca na tabela dishes e pedindo para buscar somente o dado que tenha o ID que foi passado como parâmetro. 
        const dish = await knex("dishes").where({ id }).first();

        // Fazendo a busca dos ingredientes também. Passando a dish_id que é o parâmetro passado pela request e ordenado por ordem alfabética
        const ingredients = await knex("ingredients").where({ dish_id: id }).orderBy("name");


        // Fazendo o retorno
        return response.status(200).json({
            ...dish,
            ingredients
        });
    }

    async index(request, response){
        // Fazendo a busca pelo nome do prato ou pelos ingredients existentes
        const { title, ingredients } = request.query;

        let dishes

        // Fazendo a busca pelos ingredients
        if(ingredients){
            // convertendo os ingredientes em um vetor de dados(Array) a partir de cada ","
            //.map(ingredient => ingredient.trim()); é para garantir que NÃO TEREMOS ESPAÇOS VAZIOS
            const filteredIngredients = ingredients.split(',').map(ingredient => ingredient.trim())

            // A partir do ingrediente digitado, será atribuido os pratos que contenham ele na variável dishes
            // O método whereIn() vai buscar baseado nos ingredients filtrados
            dishes = await knex("ingredients")
            .select([
                "dishes.id",
                "dishes.title",
                "dishes.price",
                "dishes.category",
                "dishes.image",
                "dishes.price"
            ])
            .whereLike("dishes.title", `%${title}%`)
            .whereIn("name", filteredIngredients)
            .innerJoin("dishes", "dishes.id", "ingredients.dish_id")
            .orderBy("dishes.title")

        } else{
        // Fazendo a busca do prato pelo nome
        dishes = await knex("dishes")
        .whereLike("title", `%${title}%`)   
    }

    const dishesIngredients = await knex("ingredients") 
    const dishesWithIngredients = dishes.map(dish => {
      const dishIngredient = dishesIngredients.filter(ingredient => ingredient.dish_id === dish.id);

      return {
        ...dish,
        ingredients: dishIngredient
      }
    })
    
    return response.status(200).json(dishesWithIngredients);
    }
};

// Exportando
module.exports = DishesController;

