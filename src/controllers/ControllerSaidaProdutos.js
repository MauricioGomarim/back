// Hash, App Error and SQLite Connection Import

const knex = require("../database/knex");

const AppError = require("../utils/AppError");

class ControllerSaidaProdutos {
  async index(request, response) {
    // Capturing Query Parameters
    const { title } = request.query;

    let client;

    if (title) {
      client = await knex("clientes")
        .whereLike("name", `%${title}%`)
        .orWhereLike("cpf", `%${title}%`)
        .select(
          "clientes.name",
          "hc.id as historico_compra_id",
          "p.title as title",
          "hs.price as price",
          "hs.quantidade as quantidade",
          "hs.created_at as data"
        )
        .innerJoin(
          "historicoSaidaProdutos as hs",
          "clientes.id",
          "hs.id_client"
        )
        .innerJoin("historicoCompra as hc", "hs.id_pedido_finalizado", "hc.id")
        .innerJoin("product as p", "hs.id_produto", "p.id")
        .orderBy("clientes.id");

      console.log(title);
    } else if (title == "" || title == undefined) {
      client = await knex("clientes")
        .select(
          "hs.id",
          "clientes.name",
          "hc.id as historico_compra_id",
          "p.title as title",
          "hs.price as price",
          "hs.quantidade as quantidade",
          "hs.created_at as data"
        )
        .innerJoin(
          "historicoSaidaProdutos as hs",
          "clientes.id",
          "hs.id_client"
        )
        .innerJoin("historicoCompra as hc", "hs.id_pedido_finalizado", "hc.id")
        .innerJoin("product as p", "hs.id_produto", "p.id")
        .orderBy("clientes.id");
    }

    return response.status(200).json(client);
  }
}

module.exports = ControllerSaidaProdutos;
