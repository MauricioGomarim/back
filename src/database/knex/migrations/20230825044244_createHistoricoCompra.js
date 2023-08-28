exports.up = (knex) =>
  knex.schema.createTable("historicoCompra", (table) => {
    table.increments("id");
    table.integer("id_client").references("id").inTable("clientes");
    table.integer("valor");
    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("historicoCompra");
