// Hash, App Error and SQLite Connection Import
const { hash, compare } = require("bcryptjs");
const knex = require("../database/knex");

const AppError = require("../utils/AppError");

class ControllerProdutosFinalizados {
  async create(request, response) {
    // // Capturing Body Parameters
    const { name, whatsapp, cpf, bairro, endereco, numero } = request.body;

    // Connection with Database
    const checkUserExists = await knex("clientes").where({ cpf }).first();

    // Verifications
    if (checkUserExists) {
      console.log(checkUserExists);
      throw new AppError("Este cliente já está cadastrado!");
    }

    await knex("clientes").insert({
      name,
      whatsapp,
      cpf,
      bairro,
      endereco,
      numero,
    });

    return response
      .status(201)
      .json({ name, whatsapp, cpf, bairro, endereco, numero });
  }

  async update(request, response) {
    const { name, whatsapp, cpf, bairro, endereco, numero } = request.body;
    const { id } = request.params;

    const client = await knex("clientes").where({ id }).first();

    if (!client) {
      throw new AppError("Cliente não encontrado");
    }

    const clientWithUpdatedCpf = await knex("clientes").where({ cpf }).first();

    if (clientWithUpdatedCpf && clientWithUpdatedCpf.id !== client.id) {
      throw new AppError("Este cpf já está em uso.");
    }

    client.name = name ?? client.name;
    client.whatsapp = whatsapp ?? client.whatsapp;
    client.cpf = cpf ?? client.cpf;
    client.bairro = bairro ?? client.bairro;
    client.endereco = endereco ?? client.endereco;
    client.numero = numero ?? client.numero;

    // Inserindo dados no banco
    await knex("clientes").where({ id }).update({
      name: client.name,
      whatsapp: client.whatsapp,
      cpf: client.cpf,
      bairro: client.bairro,
      endereco: client.endereco,
      numero: client.numero,
    });

    return response.status(201).json();
  }

  async show(request, response) {
    // Pegando o id
    const { id } = request.params;

    const dadosPedidoFinalizado = await knex("clientes as c")
      .where({ "hc.id": id })
      .select("c.name", "hc.valor", "hc.tipo_pagamento", "hc.created_at as hora")
      .innerJoin("historicoCompra as hc", "hc.id_client", "c.id")
      .first()



    console.log(dadosPedidoFinalizado)


    return response.status(201).json(dadosPedidoFinalizado);
  }

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
          "hc.id",
          "hc.valor",
          "hc.tipo_pagamento",
          "hc.created_at as data"
        )
        .innerJoin("historicoCompra as hc", "clientes.id", "hc.id_client")
        .orderBy("data");

      console.log(title);
    } else if (title == "" || title == undefined) {
      client = await knex("clientes")
        .select(
          "clientes.name",
          "hc.id",
          "hc.valor",
          "hc.tipo_pagamento",
          "hc.created_at as data"
        )
        .innerJoin("historicoCompra as hc", "clientes.id", "hc.id_client")
        .orderBy("data", "desc");
    }

    return response.status(200).json(client);
  }

  async delete(request, response) {
    const { id } = request.params;

    await knex("clientes").where({ id }).delete();

    return response.status(201).json();
  }
}

module.exports = ControllerProdutosFinalizados;
