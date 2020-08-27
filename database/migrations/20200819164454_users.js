exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username", 256).notNullable().unique().index();
    tbl.string("email", 256).notNullable();
    tbl.integer("zipcode");
    tbl.date("birthDate");
    tbl.string("password", 256).notNullable();
  })

  .createTable("intakes", (tbl) => {
    tbl.increments();
    tbl.string("intake", 128).notNullable().unique();
  })
  .createTable("types", (tbl) => {
    tbl.increments();
    tbl.string("type", 128).notNullable().unique();
  })

  .createTable("lists", (tbl) => {
    tbl.increments();
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .references("users.id")
      .onDelete("cascade");
    tbl.string("listName", 256);
    tbl.string("issues", 128);
    tbl.string("strain", 128);
    tbl.string("effect", 128);
    tbl.string("flavor", 128);
  })
  .createTable("list_types", (tbl) => {
    tbl
      .integer("list_id")
      .notNullable()
      .unsigned()
      .references("lists.id")
      .onDelete("cascade");
    tbl
      .integer("type_id")
      .notNullable()
      .unsigned()
      .references("types.id");
    tbl.primary(["list_id", "type_id"]); //forces the primary key so that there can't be id mismatches
  })
  .createTable("list_intakes", (tbl) => {
    tbl
      .integer("list_id")
      .notNullable()
      .unsigned()
      .references("lists.id")
      .onDelete("cascade");
    tbl
      .integer("intake_id")
      .notNullable()
      .unsigned()
      .references("intakes.id");
    tbl.primary(["list_id", "intake_id"]); //forces the primary key so that there can't be id mismatches
  })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("list_descriptions")
    .dropTableIfExists("list_intakes")
    .dropTableIfExists("list_types")
    .dropTableIfExists("lists")
    .dropTableIfExists("types")
    .dropTableIfExists("intakes")
    .dropTableIfExists("users");
};
