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
  getEffects,
  getFlavors,
  getEffectOrFlavorIds,
  updatePrefs
};
function getEffectOrFlavorIds(type) {
  if (type === "effect") {
    return db("effects");
  }
  if (type === "flavor") {
    return db("flavors");
  }
}

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
  } else {
    return "pass a 'type' argument as either 'effect', description, or 'flavor' please";
  }
}
function updatePrefs(payload, type) {
  if (type === "effect") {
    return db("list_effects").insert(payload);
  } else if (type === "flavor") {
    return db("list_flavors").insert(payload);
  } else {
    return "you messed up. pass a 'type' argument as either 'effect', description, or 'flavor' please";
  }
}
function addList(listName, user_id, issues, strain, type, intake ) {
  console.log(user_id, listName, issues, strain, type, intake )
  return db("lists").insert({ user_id, listName, issues, strain, type, intake });
}

function getLists(id) {
  return db("lists").where({user_id: id}).select("listName", "issues", "strain", "type", "intake")
}
function getList(id) {
  return db("lists").where({id: id})
}
function deleteList(listName, userId) {
  return db("lists").where({ listName: listName, user_id: userId }).del();
}

async function getEffects(listID) {
 try{
     const effects = db("list_effects as le")
    .join("effects as e", "e.id", "le.effect_id")
    .where({list_id: listID}).select("effect")
    return effects
} catch(error){
  throw error;
}
}

async function getFlavors(listID) {
  try{
    const flavors = db("list_flavors as le")
    .join("flavors as e", "e.id", "le.flavor_id")
    .where({list_id: listID}).select("flavor");
     return flavors;
 } catch(error){
   throw error;
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
