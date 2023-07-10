exports.up = knex => knex.schema.createTable("brand", table => {
    table.increments("id");
    table.text("title");
});

exports.down = knex => knex.schema.dropTable("brand");
