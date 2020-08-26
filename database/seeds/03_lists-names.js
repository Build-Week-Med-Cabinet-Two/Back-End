exports.seed = function (knex, Promise) {
  return knex("lists").insert([
    { user_id: 1, listName: "Sleepy", userDescription: "Dancer"},
    { user_id: 1, listName: "Grumpy", userDescription: "Prancer"},
    { user_id: 1, listName: "Sneezy", userDescription: "Dotzen" },
    { user_id: 2, listName: "Dopey", userDescription: "Blitzen"},
    { user_id: 2, listName: "Doc", userDescription: "Curley" },
    { user_id: 2, listName: "Rudoff", userDescription: "Moe"},
    { user_id: 2, listName: "Couchlock", userDescription: "Buster"}
  ]);
};