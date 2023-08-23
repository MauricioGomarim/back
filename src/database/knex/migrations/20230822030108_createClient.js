exports.up = (knex) =>
  knex.schema.createTable("clientes", (table) => {
    table.increments("id");
    table.text("name");
    table.text("whatsapp");
    table.text("cpf");
    table.text("bairro");
    table.text("endereco");
    table.text("numero");


    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("clientes");
