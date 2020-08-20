exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const usertypes = [
    {
      name: "Food Truck Operator", // will get id 1
    },
    {
      name: "User", // will get id 2
    },

  ];

  return knex("usertypes")
    .insert(usertypes)
    .then(() => console.log("\n== Seed data for usertypes table added. ==\n"));
};