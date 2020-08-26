exports.up = function (knex) {
  return knex.schema.createTable("users", (tbl) => {
    tbl.increments();
    tbl.string("username", 256).notNullable().unique().index();
    tbl.string("email", 256).notNullable();
    tbl.integer("zipcode");
    tbl.date("birthDate");
    tbl.string("password", 256).notNullable();
  })

  .createTable("flavors", (tbl) => {
    tbl.increments();
    tbl.string("flavor", 128).notNullable().unique();
  })
  .createTable("effects", (tbl) => {
    tbl.increments();
    tbl.string("effect", 128).notNullable().unique();
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
    tbl.string("userDescription", 128).notNullable().index();
  })
  .createTable("list_effects", (tbl) => {
    tbl
      .integer("list_id")
      .notNullable()
      .unsigned()
      .references("lists.id")
      .onDelete("cascade");
    tbl
      .integer("effect_id")
      .notNullable()
      .unsigned()
      .references("effects.id");
    tbl.primary(["list_id", "effect_id"]); //forces the primary key so that there can't be id mismatches
  })
  .createTable("list_flavors", (tbl) => {
    tbl
      .integer("list_id")
      .notNullable()
      .unsigned()
      .references("lists.id")
      .onDelete("cascade");
    tbl
      .integer("flavor_id")
      .notNullable()
      .unsigned()
      .references("flavors.id");
    tbl.primary(["list_id", "flavor_id"]); //forces the primary key so that there can't be id mismatches
  })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists("list_descriptions")
    .dropTableIfExists("list_flavors")
    .dropTableIfExists("list_effects")
    .dropTableIfExists("lists")
    .dropTableIfExists("effects")
    .dropTableIfExists("flavors")
    .dropTableIfExists("users");
};
