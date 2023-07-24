exports.up = (knex) =>
  knex.schema.createTable("product", (table) => {
    table.increments("id");
    table.text("codigo");
    table.text("title");
    table.text("category");
    table.text("brand");
    table.text("description");
    table.text("size");
    table.text("amount");
    table.text("price");
    table.varchar("image");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
  });

exports.down = (knex) => knex.schema.dropTable("product");
