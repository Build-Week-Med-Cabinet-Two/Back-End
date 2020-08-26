const db = require("../dbConfig");

module.exports = {
  add,
  findBy,
  getUsers,
  update,
  remove,
  getListId,
  updateLists,
  addList,
  getList,
  getLists,
  deleteList,
  getEffectOrFlavorIds,
};

function userToBody(user) {
  const result = {
    ...user,
  };
  return result;
}

function getListId(listName, id) {
  return db("lists").where({ listName: listName, user_id: id }).select("id");
}
function updateLists(payload, type) {
  console.log(payload);
  if (type === "effect") {
    return db("list_effects").insert(payload);
  } else if (type === "flavor") {
    return db("list_flavors").insert(payload);
  } else if (type === "description") {
    return db("lists").insert({
      listName: payload.listName,
      userDescription: payload.description,
      list_id: payload.list_ID,
    });
  } else {
    return "you messed up. pass a 'type' argument as either 'effect', description, or 'flavor' please";
  }
}

function addList(listName, user_id) {
  return db("lists").insert({ user_id, listName });
}
function getList(user_id, type, listName) {
  if (type === "effects") {
    return db("list_effects as le")
      .leftJoin("lists as l", "le.list_id", "l.id")
      .join("effects as e", "e.id", "le.effect_id")
      .where({ user_id: user_id, listName: listName })
      .select("l.listName", "e.effect");
  } else if (type === "flavors") {
    return db("list_flavors as lf")
      .leftJoin("lists as l", "lf.list_id", "l.id")
      .join("flavors as f", "f.id", "lf.flavor_id")
      .where({ user_id: user_id, listName: listName })
      .select("l.listName", "f.flavor");
  } else if (type === "list_descriptions") {
    return db("list_descriptions as ld")
      .leftJoin("lists as l", "ld.list_id", "l.id")
      .where({ user_id: user_id, listName: listName })
      .select("l.listName", "ld.userDescription");
  }
}

function getLists(user_id, type) {
  if (type === "effects") {
    return db("list_effects as le")
      .leftJoin("lists as l", "le.list_id", "l.id")
      .join("effects as e", "e.id", "le.effect_id")
      .where({ user_id: user_id })
      .select("l.listName", "e.effect");
  } else if (type === "flavors") {
    return db("list_flavors as lf")
      .leftJoin("lists as l", "lf.list_id", "l.id")
      .join("flavors as f", "f.id", "lf.flavor_id")
      .where({ user_id: user_id })
      .select("l.listName", "f.flavor");
  } else if (type === "list_descriptions") {
    return db("list_descriptions as ld")
      .leftJoin("lists as l", "ld.list_id", "l.id")
      .where({ user_id: user_id })
      .select("l.listName", "ld.userDescription");
  }
}
function deleteList(listName, userId) {
  return db("lists").where({ listName: listName, user_id: userId }).del();
}
function getEffectOrFlavorIds(type) {
  if (type === "effect") {
    return db("effects");
  }
  if (type === "flavor") {
    return db("flavors");
  }
}
async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}
function findBy(filter) {
  return db("users").where(filter).orderBy("id");
}
function update(changes, id) {
  return db("users").where({ id }).update(changes);
}

function remove(id) {
  return db("users").where({ id }).delete();
}

function findById(id) {
  return db("users").where({ id }).first();
}
function getUsers(id) {
  let query = db("users").select("id", "username", "email");

  if (id) {
    return query
      .where("id", id)
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
