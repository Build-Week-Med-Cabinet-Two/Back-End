const db = require("../dbConfig");

module.exports = {
  add,
  getUsers,
  remove,
};
function userToBody(user) {
  const result = {
    ...user,
  };
  return result;
}

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}
function remove(id) {
  return db("users").where({ id }).delete();
}

function findById(id) {
  return db("users").where({ id }).first();
}
function getUsers(id) {
  let query = db("users as u").join("usertypes as t", "u.usertype", "t.id").select("u.id", "u.username", "t.name as usertype");

  if (id) {
    return query
      .where("u.id", id)
      .first()
      .then((user) => {
        if (user) {
          return userToBody(user);
        } else {
          return null;
        }
      });
  } else {
    return query.then((users) => {
      return users.map((user) => userToBody(user));
    });
  }
}
