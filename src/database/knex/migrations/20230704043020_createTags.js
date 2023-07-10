exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id");
    table.text("title");
    table
    .integer("product_id")
    .references("id")
    .inTable("product")
    .onDelete("CASCADE");
});

exports.down = knex => knex.schema.dropTable("tags");
