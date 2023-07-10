// Hash, App Error and SQLite Connection Import
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class ProductsController {
  async create(request, response) {
    // Capturing Body Parameters
    const { title, category, description, brand, tags, price, amount } = request.body;

    const titleExist = await knex("product").where({title}).first();

    if(titleExist) {
      throw new AppError("Já existe um produto com o mesmo nome!")
    }

    const [product_id] = await knex("product").insert({
      title,
      category,
      description,
      brand,
      price,
      amount,
    });

    // Verificando se o produto tem apenas uma tag
    const temApenasUmaTag = typeof tags === "string";

    let tagsInsert;

    if (product_id) {
      if (temApenasUmaTag) {
        tagsInsert = {
          title: tags,
          product_id,
        };
      } else if (tags.length > 1) {
        tagsInsert = tags.map((name) => {
          return {
            title: name,
            product_id,
          };
        });
      }
      await knex("tags").insert(tagsInsert);
    } else {
      throw new AppError("Não foi possivel cadastrar esse prato!");
    }

    return response
      .status(201)
      .json({ category, description, brand, tags, price, amount });
  }

  async update(request, response) {
    const { title, category, description, brand, tags, price, amount } = request.body;
    const { id } = request.params;

    // // Getting the dish data through the informed ID
    const product = await knex("product").where({ id }).first();

    product.title = title ?? product.title;
    product.category = category ?? product.category;
    product.description = description ?? product.description;
    product.brand = brand ?? product.brand;
    product.price = price ?? product.price;
    product.amount = amount ?? product.amount;

    await knex("product").where({ id }).update(product);

    // Verificando se o produto tem apenas uma tag
    const temApenasUmaTag = typeof tags === "string";

    let tagsInsert;

    if (temApenasUmaTag) {
      tagsInsert = {
        title: tags,
        product_id: id,
      };
    } else if (tags.length > 1) {
      tagsInsert = tags.map((name) => {
        return {
          title: name,
          product_id: id,
        };
      });
    }
    await knex("tags").where({ product_id: id }).delete();
    await knex("tags").where({ product_id: id }).insert(tagsInsert);

    return response.status(201).json();
  }

  async show(request, response) {
    // Pegando o id
    const { id } = request.params;

    const product = await knex("product").where({ id }).first();
    const tags = await knex("tags")
      .where({ product_id: id })
      .orderBy("title");

    return response.status(201).json({
      ...product,
      tags,
    });
  }

  async index(request, response) {
    // Capturing Query Parameters
    const { title } = request.query;

    
      let product = await knex("product")
        .whereLike("title", `%${title}%`)
        .orderBy("title");
   

    const tagsProducts = await knex("tags");
    const productsComTags = product.map((product) => {
      const tagProduct = tagsProducts.filter(
        (tag) => tag.product_id === product.id
      );
      return {
        ...product,
        tags: tagProduct,
      };
    });
    return response.status(200).json(productsComTags);
  }

  async delete(request, response) {
    const { id } = request.params;

    const product = await knex("product").where({ id }).first();

    await knex("product").where({ id }).delete();

    return response.status(201).json();
  }
}

module.exports = ProductsController;
