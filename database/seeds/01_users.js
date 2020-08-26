const bcryptjs = require("bcryptjs");
const rounds = process.env.BCRYPT_ROUNDS;

exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

  const users = [
    {
      username: "user", password: bcryptjs.hashSync("password", rounds), email: "kevin.malone@office.com"
    },
    {
      username: "user1", password: bcryptjs.hashSync("password", rounds), email: "toby.flenderson@office.com"
    },
    {
      username: "user2", password: bcryptjs.hashSync("password", rounds), email: "oscar.martinez@office.com"
    },
    {
      username: "user3", password: bcryptjs.hashSync("password", rounds), email: "angela.martin@office.com"
    },
  ];

  return knex("users")
    .insert(users)
    .then(() => console.log("\n== Seed data for users table added. ==\n"));
};
