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
  getTypes,
  getIntakes,
  getTypeOrIntakeIds,
  updatePrefs
};
function getTypeOrIntakeIds(type) {
  if (type === "type") {
    return db("types");
  }
  if (type === "intake") {
    return db("intakes");
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
  if (type === "type") {
    return db("list_types").insert(payload);
  } else if (type === "intake") {
    return db("list_intakes").insert(payload);
  } else {
    return "pass a 'type' argument as either 'type', description, or 'intake' please";
  }
}
function updatePrefs(payload, type) {
  if (type === "type") {
    return db("list_types").insert(payload);
  } else if (type === "intake") {
    return db("list_intakes").insert(payload);
  } else {
    return "you messed up. pass a 'type' argument as either 'type', description, or 'intake' please";
  }
}
function addList(listName, user_id, issues, strain, effect, flavor ) {
  console.log(user_id, listName, issues, strain, effect, flavor )
  return db("lists").insert({ user_id, listName, issues, strain, effect, flavor });
}

function getLists(id) {
  return db("lists").where({user_id: id}).select("listName", "issues", "strain", "effect", "flavor")
}
function getList(id) {
  return db("lists").where({id: id})
}
function deleteList(listName, userId) {
  return db("lists").where({ listName: listName, user_id: userId }).del();
}

async function getTypes(listID) {
 try{
     const types = db("list_types as le")
    .join("types as e", "e.id", "le.type_id")
    .where({list_id: listID}).select("type")
    return types
} catch(error){
  throw error;
}
}

async function getIntakes(listID) {
  try{
    const intakes = db("list_intakes as le")
    .join("intakes as e", "e.id", "le.intake_id")
    .where({list_id: listID}).select("intake");
     return intakes;
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
