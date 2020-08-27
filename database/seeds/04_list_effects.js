
exports.seed = function (knex, Promise) {
  return knex("list_effects").insert([
    { list_id: 1, effect_id: 1 },
    { list_id: 1, effect_id: 2 },
    { list_id: 1, effect_id: 3 },
    { list_id: 1, effect_id: 4 },
    { list_id: 1, effect_id: 5 },
    { list_id: 1, effect_id: 8 },
    { list_id: 2, effect_id: 3 },
    { list_id: 2, effect_id: 5 },
    { list_id: 2, effect_id: 6 },
    { list_id: 2, effect_id: 7 },
    { list_id: 2, effect_id: 8 },
    { list_id: 2, effect_id: 9 },
    { list_id: 2, effect_id: 10 },
    { list_id: 2, effect_id: 11 },
    { list_id: 3, effect_id: 10 },
    { list_id: 3, effect_id: 11 },
    { list_id: 4, effect_id: 10 },
    { list_id: 4, effect_id: 11 },
    { list_id: 5, effect_id: 10 },
    { list_id: 5, effect_id: 11 },
    { list_id: 6, effect_id: 11 },
    { list_id: 6, effect_id: 12 },
    { list_id: 7, effect_id: 1 },
    { list_id: 7, effect_id: 4 },
  ]);
};