
exports.seed = function (knex, Promise) {
  return knex("list_types").insert([
    { list_id: 1, type_id: 1 },
    { list_id: 2, type_id: 3 },
    { list_id: 3, type_id: 3 },
    { list_id: 4, type_id: 2 },
    { list_id: 5, type_id: 1 },
    { list_id: 6, type_id: 1 },
    { list_id: 7, type_id: 1 },
  ]);
};