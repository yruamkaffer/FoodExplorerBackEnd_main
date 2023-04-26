exports.up = knex => knex.schema.createTable("dishes", table => {
    table.increments("id");
    table.text("title").notNullable();
    table.text("description").notNullable();
    table.text("category").notNullable();
    table.text("image");
    // table.text("image").notNullable();
    table.decimal("price", 14,2).notNullable();
    // table.boolean("is_favorite").default(false).references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
});


exports.down = knex => knex.schema.dropTable("dishes");
