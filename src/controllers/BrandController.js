// Hash, App Error and SQLite Connection Import
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class BrandController {
  async create(request, response) {
    // Capturing Body Parameters
    const { marca: title } = request.body;


    // // Connection with Database
    const checkBrandExist = await knex("brand")
      .where({title}).first();

    // // Verifications
    if (checkBrandExist) {
      throw new AppError("Está marca já está cadastrada!");
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
    const { title } = request.body;
    const { id } = request.params;

    const brand = await knex("brand").where({ id }).first();

    brand.title = title ?? brand.title;

    await knex("brand").where({ id }).update(brand);

    return response.status(201).json();
  }

  async show(request, response) {
    // Pegando o id
    const { id } = request.params;

    const brand = await knex("brand").where({ id }).first();

    return response.status(201).json(brand);
  }

  async delete(request, response) {
    const { id } = request.params;


    await knex("brand").where({ id }).delete();

    return response.status(201).json();
  }
}

module.exports = BrandController;
