// Hash, App Error and SQLite Connection Import
const AppError = require("../utils/AppError");
const knex = require("../database/knex");
const DiskStorage = require("../providers/DiskStorage");

class ProductsController {
  async create(request, response) {
    // Capturing Body Parameters
    const { title, category, brand, description, size, amount, price } = request.body;

    let filename = "";
      // Requesting image filename
      const imageFileName = request.file?.filename;

     // Instanciando diskStorage
     const diskStorage = new DiskStorage();

    if (imageFileName != null || imageFileName != undefined ) {
     // Saving image file
     filename = await diskStorage.saveFile(imageFileName);
    }

    const [product_id] = await knex("product").insert({
      title,
      category,
      brand,
      description,
      size,
      amount,
      price,
      image: filename
    });

    return response
      .status(201)
      .json({ title, category, brand, description, size, amount, price });
  }

  async update(request, response) {
    const { title, category, brand, description, size, amount, price } = request.body;
    const { id } = request.params;


    // // ?. é um operador channel, que verifica se existe o filename dentro de file
    const imageFileName = request.file?.filename;

    // Instantiating diskStorage
    const diskStorage = new DiskStorage();

    const product = await knex("product").where({ id }).first();

    // Deleting the old image if a new image is uploaded and saving the new image
    if (imageFileName != null || imageFileName != undefined ) {
      await diskStorage.deleteFile(product.image);
      const filename = await diskStorage.saveFile(imageFileName);
      product.image = filename ?? product.image;
    }

    // // Getting the dish data through the informed ID


    product.title = title ?? product.title;
    product.category = category ?? product.category;
    product.brand = brand ?? product.brand;
    product.description = description ?? product.description;
    product.size = size ?? product.size;
    product.amount = amount ?? product.amount;
    product.price = price ?? product.price;

    await knex("product").where({ id }).update(product);
    return response.status(201).json();
  }

  async show(request, response) {
    // Pegando o id
     const { id } = request.params;

     const product = await knex("product").where({ id }).first();


    return response.status(201).json(product);
  }

  async index(request, response) {
    // Capturing Query Parameters
    const { title } = request.query;

    
      let product
      
        if(title){
          product = await knex("product")
          .whereLike("title", `%${title}%`)
          .orderBy("title");
        } else {
          product = await knex("product")
          .orderBy("title");
        }


   
    return response.status(200).json(product);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("product").where({ id }).delete();

    return response.status(201).json();
  }
}

module.exports = ProductsController;
