exports.seed = function (knex, Promise) {
  return knex("lists").insert([
    { user_id: 1, listName: "Sleepy", issues: "Dancer"},
    { user_id: 1, listName: "Grumpy", issues: "Prancer"},
    { user_id: 1, listName: "Sneezy", issues: "Dotzen" },
    { user_id: 2, listName: "Dopey", issues: "Blitzen"},
    { user_id: 2, listName: "Doc", issues: "Curley" },
    { user_id: 2, listName: "Rudoff", issues: "Moe"},
    { user_id: 2, listName: "Couchlock", issues: "Buster"}
  ]);
};