// Hash, App Error and SQLite Connection Import
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class BrandController {
  async create(request, response) {
    // Capturing Body Parameters
    const { title } = request.body;

    // // Connection with Database
    const checkCategoryExist = await knex("brand")
      .where({ title })
      .first();

    // Verifications
    if (checkCategoryExist) {
      throw new AppError("Erro: Está marca já está cadastrada!");
    }

    await knex("brand").insert({ title });

    return response.status(201).json();
  }

  async index(request, response) {
    // Capturing Query Parameters
    const { title } = request.query;

    let brands

    if(title){
      brands = await knex("brand")
      .whereLike("title", `%${title}%`)
      .orderBy("title");
    } else {
      brands = await knex("brand")
      .orderBy("title");
    }


    return response.status(200).json(brands);
  }

  async update(request, response) {
    const { title, description, category, price, ingredients } = request.body;
    const { id } = request.params;

    // // ?. é um operador channel, que verifica se existe o filename dentro de file
    const imageFileName = request.file?.filename;

    // Instantiating diskStorage
    const diskStorage = new DiskStorage();

    // // Getting the dish data through the informed ID
    const dish = await knex("pratos").where({ id }).first();

    // Deleting the old image if a new image is uploaded and saving the new image
    if (imageFileName != null || imageFileName != undefined) {
      await diskStorage.deleteFile(dish.image);
      const filename = await diskStorage.saveFile(imageFileName);
      dish.image = filename ?? dish.image;
    }

    dish.title = title ?? dish.title;
    dish.description = description ?? dish.description;
    dish.category = category ?? dish.category;
    dish.price = price ?? dish.price;

    await knex("pratos").where({ id }).update(dish);

    // Verificando se o prato tem apenas um ingrediente e inserindo as informações no banco de dados
    const temApenasUmIngrediente = typeof ingredients === "string";

    let ingredientsInsert;

    if (temApenasUmIngrediente) {
      ingredientsInsert = {
        dish_id: dish.id,
        name: ingredients,
      };
    } else if (ingredients.length > 1) {
      ingredientsInsert = ingredients.map((name) => {
        return {
          dish_id: dish.id,
          name,
        };
      });
    }
    await knex("ingredients").where({ dish_id: id }).delete();
    await knex("ingredients").where({ dish_id: id }).insert(ingredientsInsert);

    return response.status(201).json();
  }

  async show(request, response) {
    // Pegando o id
    const { id } = request.params;

    const dish = await knex("pratos").where({ id }).first();
    const ingredients = await knex("ingredients")
      .where({ dish_id: id })
      .orderBy("name");

    return response.status(201).json({
      ...dish,
      ingredients,
    });
  }

  async delete(request, response) {
    const { id } = request.params;

    const dish = await knex("pratos").where({ id }).first();

    const diskStorage = new DiskStorage();
    await diskStorage.deleteFile(dish.image);

    await knex("pratos").where({ id }).delete();

    return response.status(201).json();
  }
}

module.exports = BrandController;
