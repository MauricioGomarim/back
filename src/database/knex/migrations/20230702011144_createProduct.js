exports.up = knex => knex.schema.createTable("product", table => {
    table.increments("id");
    table.text("title");
    table.text("category");
    table.text("description");
    table.text("brand");
    table.text("tag");
    table.text("price");
    table.text("amount");
    table.varchar("image");
});

exports.down = knex => knex.schema.dropTable("product");
