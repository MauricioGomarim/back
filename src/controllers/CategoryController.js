// Hash, App Error and SQLite Connection Import
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class CategoryController {
  async create(request, response) {
    // Capturing Body Parameters
    const { category: title } = request.body;  

   

    // // Connection with Database
    const checkCategoryExist = await knex("categories")
      .where({ title })
      .first();


    // Verifications
    if (checkCategoryExist) {
      throw new AppError("Erro: Está categoria já está cadastrada!");
    }

    await knex("categories").insert({ title });
    return response.status(201).json();
  }

  async update(request, response) {
    const { categoria: title } = request.body;
    const { id } = request.params;
    console.log(title)
    const categoria = await knex("categories").where({ id }).first();

    categoria.title = title ?? categoria.title;

    await knex("categories").where({ id }).update(categoria);

    return response.status(201).json();
  }

  async show(request, response) {
    // Pegando o id
    const { id } = request.params;

    const categoies = await knex("categories").where({ id }).first();

    return response.status(201).json(categoies);
  }

  async index(request, response) {
    // Capturing Query Parameters
    const { title, ingredients } = request.query;

    let categories

    if(title){
      categories = await knex("categories")
      .whereLike("title", `%${title}%`)
      .orderBy("title");
    } else {
      categories = await knex("categories")
      .orderBy("title");
    }


    return response.status(200).json(categories);
  }

  async delete(request, response) {
    const { id } = request.params;


    await knex("categories").where({ id }).delete();

    return response.status(201).json();
  }
}

module.exports = CategoryController;
