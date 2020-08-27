
exports.seed = function (knex, Promise) {
  return knex("list_intakes").insert([
    { list_id: 1, intake_id: 1 },
    { list_id: 2, intake_id: 3 },
    { list_id: 3, intake_id: 2 },
    { list_id: 4, intake_id: 2 },
    { list_id: 5, intake_id: 1 },
    { list_id: 6, intake_id: 4 },
    { list_id: 7, intake_id: 3 },
  ]);
};