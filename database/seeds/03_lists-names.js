exports.seed = function (knex, Promise) {
  return knex("lists").insert([
    { user_id: 1, listName: "Sleepy" },
    { user_id: 1, listName: "Grumpy" },
    { user_id: 1, listName: "Sneezy" },
    { user_id: 2, listName: "Dopey" },
    { user_id: 2, listName: "Doc" },
    { user_id: 2, listName: "Rudoff"},
    { user_id: 2, listName: "Couchlock"},
  ]);
};