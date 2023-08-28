exports.up = (knex) =>
  knex.schema.createTable("historicoSaidaProdutos", (table) => {
    table.increments("id");
    table.integer("id_client").references("id").inTable("clientes");
    table.integer("id_pedido_finalizado").references("id").inTable("historicoCompra");;
    table.integer("id_produto").references("id").inTable("product");
    table.integer("price");
    table.integer("quantidade");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("historicoSaidaProdutos");
