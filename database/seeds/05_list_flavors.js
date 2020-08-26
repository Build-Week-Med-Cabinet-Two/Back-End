
exports.seed = function (knex, Promise) {
  return knex("list_flavors").insert([
    { list_id: 1, flavor_id: 1 },
    { list_id: 1, flavor_id: 2 },
    { list_id: 1, flavor_id: 3 },
    { list_id: 1, flavor_id: 4 },
    { list_id: 1, flavor_id: 5 },
    { list_id: 3, flavor_id: 8 },
    { list_id: 2, flavor_id: 3 },
    { list_id: 2, flavor_id: 5 },
    { list_id: 2, flavor_id: 6 },
    { list_id: 3, flavor_id: 7 },
    { list_id: 4, flavor_id: 8 },
    { list_id: 5, flavor_id: 9 },
    { list_id: 5, flavor_id: 10 },
    { list_id: 4, flavor_id: 11 },
    { list_id: 6, flavor_id: 11 },
    { list_id: 6, flavor_id: 12 },
    { list_id: 7, flavor_id: 8 },
    { list_id: 7, flavor_id: 3 },
  ]);
};