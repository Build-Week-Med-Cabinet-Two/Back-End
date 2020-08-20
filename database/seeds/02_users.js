exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "Kevin Malone", password: "password", usertype: "1"
    },
    {
      username: "Toby H. Flenderson", password: "password", usertype: "2"
    },
    {
      username: "Oscar Martinez", password: "password", usertype: "2"
    },
    {
      username: "Angela Martin", password: "password", usertype: "2"
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
