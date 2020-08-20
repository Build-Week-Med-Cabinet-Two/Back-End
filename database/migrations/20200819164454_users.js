exports.up = function (knex) {
    return knex.schema
      .createTable("usertypes", tbl => {
        tbl.increments();
  
        tbl.string("name", 128).notNullable().unique();
      })
      .createTable("users", tbl => {
        tbl.increments();
  
        tbl.string("username", 128).notNullable().unique().index();
        tbl.string("password", 256).notNullable();
  
        tbl
          .integer("usertype")
          .unsigned()
          .references("usertypes.id")
          .onDelete("RESTRICT")
          .onUpdate("CASCADE");
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("usertypes").dropTableIfExists("users");
  };
  