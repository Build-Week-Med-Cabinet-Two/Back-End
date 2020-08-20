exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "Kevin Malone", password: "password", email: "kevin.malone@office.com"
    },
    {
      username: "Toby H. Flenderson", password: "password", email: "toby.flenderson@office.com"
    },
    {
      username: "Oscar Martinez", password: "password", email: "oscar.martinez@office.com"
    },
    {
      username: "Angela Martin", password: "password",email: "angela.martin@office.com"
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
