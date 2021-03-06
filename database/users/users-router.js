const router = require("express").Router();
//add restricted middleware to functions
const restricted = require("../middleware/restricted.js");
const Users = require("./users-model.js");
const axios = require("axios");

const DATABASE_URL = process.env.DATABASE_URL;


async function getRecs(prefs) {
  try {
    data = { "input" : prefs }

    const recResponse = await axios.post(
      DATABASE_URL,
      data
    );
    const recommendations = recResponse.data;

    return recommendations;
  } catch (err) {
    return err.message;
  }
}


// async function getRecs(prefs) {
//   try {
//     const formData = new FormData();

//     formData.append("Flavors/Effects", prefs);

//     const recResponse = await axios.post(
//       DATABASE_URL,
//       formData,
//       {
//         // You need to use `getHeaders()` in Node.js because Axios doesn't
//         // automatically set the multipart form boundary in Node.
//         headers: formData.getHeaders(),
//       }
//     );
//     const recommendations = recResponse.data;

//     return recommendations;
//   } catch (err) {
//     return err.message;
//   }
// }

async function getListObject(list_id) {
  try {
    const name = await Users.getList(list_id);
    const types = await Users.getTypes(list_id);
    const intakes = await Users.getIntakes(list_id);
    // console.log(listID, name[0].listName, list_id)
    const list = {
      name: name[0].listName,
      //    id: name[0].id,
      issues: name[0].issues,
      strain: name[0].strain,
      effect: name[0].effect,
      flavor: name[0].flavor,
      types: types.map((x) => x.type),
      intakes: intakes.map((x) => x.intake),
    };
    return list;
  } catch (err) {
    return err.message;
  }
}

router.post("/add-list", async (req, res) => {
  try {
    let user = req.decodedJwt.username;
    let listName = req.body.listName;
    let { issues, strain, effect, flavor } = req.body;
    let id = req.decodedJwt.subject;
    let newPreferences = req.body;

    let exists = await Users.getListId(listName, id);
    if (exists.length > 0) {
      res.status(400).json({
        message: "A list with that name already exists.",
        error: "Try something new",
      });
    }

    await Users.addList(listName, id, issues, strain, effect, flavor);
    //let payload = await getListObject(id);
    //console.log(payload)
    const ListId = await Users.getListId(listName, id);

    let newListId = ListId[0].id;

    let allIntakes = await Users.getTypeOrIntakeIds("intake");
    let allTypes = await Users.getTypeOrIntakeIds("type");

    let someIntakes = allIntakes.filter((intake) => {
      return newPreferences.intakes.some(function (e) {
        return e == intake.intake;
      });
    });

    let someTypes = allTypes.filter((type) => {
      return newPreferences.types.some(function (e) {
        return e == type.type;
      });
    });
    let TypeArr = someTypes.map((x) => ({
      list_id: newListId,
      type_id: x.id,
    }));
    let IntakeArr = someIntakes.map((x) => ({
      list_id: newListId,
      intake_id: x.id,
    }));

    await Users.updatePrefs(IntakeArr, "intake");
    await Users.updatePrefs(TypeArr, "type");
    const payload = await getListObject(newListId);
    const PayValues = Object.values(payload);
    const searchString = [].concat.apply([], PayValues).join(" ");
    let recommendations = await getRecs(searchString);
    res.status(200).json({
      message: ` ${user} just CREATED list: ${listName}`,
      list: payload,
      results: recommendations,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});
router.put("/update-list", async (req, res) => {
  try {
    let user = req.decodedJwt.username;
    let { oldListName, listName, issues, strain, effect, flavor } = req.body;
    let id = req.decodedJwt.subject;
    let newPreferences = req.body;
    await Users.deleteList(oldListName, id);
    await Users.addList(listName, id, issues, strain, effect, flavor);
    //let payload = await getListObject(id);
    //console.log(payload)
    const ListId = await Users.getListId(listName, id);
    let newListId = ListId[0].id;

    let allIntakes = await Users.getTypeOrIntakeIds("intake");
    if (newPreferences.intakes) {
      if (newPreferences.intakes.length !== 0) {
        let someIntakes = allIntakes.filter((intake) => {
          return newPreferences.intakes.some(function (e) {
            return e == intake.intake;
          });
        });
        let IntakeArr = someIntakes.map((x) => ({
          list_id: newListId,
          intake_id: x.id,
        }));
        await Users.updatePrefs(IntakeArr, "intake");
      }
    }
    if (newPreferences.types) {
      if (newPreferences.types.length !== 0) {
        let allTypes = await Users.getTypeOrIntakeIds("type");
        let someTypes = allTypes.filter((type) => {
          return newPreferences.types.some(function (e) {
            return e == type.type;
          });
        });
        let TypeArr = someTypes.map((x) => ({
          list_id: newListId,
          type_id: x.id,
        }));

        await Users.updatePrefs(TypeArr, "type");
      }
    }

    const payload = await getListObject(newListId);
    const PayValues = Object.values(payload);
    const searchString = [].concat.apply([], PayValues).join(" ");
    // let searchValue = Object.values(payload).flat().join(" ");
    //console.log(searchValue)
    let recommendations = await getRecs(searchString);
    res.status(200).json({
      message: ` ${user} just UPDATED list: ${listName}`,
      list: payload,
      results: recommendations,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});

router.get("/list/:listName", restricted, async (req, res) => {
  const list = req.params.listName;
  const id = await Users.getListId(list, req.decodedJwt.subject);
  const payload = await getListObject(id[0].id);
  const PayValues = Object.values(payload);
  const searchString = [].concat.apply([], PayValues).join(" ");
  //console.log(searchString)
  // let searchValue = Object.values(payload).flat().join(" ");
  getRecs(searchString)
    .then((results) => {
      res.status(200).json({ results: results });
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/lists/", restricted, (req, res) => {
  Users.getLists(req.decodedJwt.subject)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});
// Routes to get user info used in testing
// router.get("/", restricted, (req, res) => {
//   Users.getUsers()
//     .then((users) => {
//       res.status(200).json(users);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });

// router.get("/:id", restricted, (req, res) => {
//   Users.getUsers(req.params.id)
//     .then((user) => {
//       res.status(200).json(user);
//     })
//     .catch((error) => {
//       res.status(500).json(error);
//     });
// });

router.delete("/delete-list", async (req, res) => {
  try {
    let listName = req.body.listName;
    let id = req.decodedJwt.subject;
    console.log(listName, id);
    let exists = await Users.getListId(listName, id);
    if (exists.length < 1) {
      res.status(400).json({
        message: "That list doesn't exist",
        error: "That's a bummer for ya",
      });
    }
    await Users.deleteList(listName, id);

    res.status(200).json({
      message: `List successfully deleted`,
    });
  } catch (err) {
    res.status(500).json({
      message: "list delete failed",
      err: err,
      errmessage: err.message,
    });
  }
});

// router.delete("/:id", restricted, async (req, res, next) => {
//   try {
//     await Users.remove(req.params.id);
//     res
//       .status(200)
//       .json({ message: `${req.params.id} DELETED`, Users: req.Users });
//   } catch (error) {
//     next(error);
//   }
// });
module.exports = router;
