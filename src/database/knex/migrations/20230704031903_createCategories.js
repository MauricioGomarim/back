exports.up = knex => knex.schema.createTable("categories", table => {
    table.increments("id");
    table.text("title");
});

exports.down = knex => knex.schema.dropTable("categories");
