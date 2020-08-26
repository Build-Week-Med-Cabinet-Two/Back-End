const router = require("express").Router();
//add restricted middleware to functions
const restricted = require("../middleware/restricted.js");
const Users = require("./users-model.js");

async function getListObject(list_id) {
  try {
    const name = await Users.getList(list_id);
    const effects = await Users.getEffects(list_id);
    const flavors = await Users.getFlavors(list_id);
   // console.log(listID, name[0].listName, list_id)
    const list = {
  //    listName: name[0].listName,
      list_id: 8,
      description: name[0].userDescription,
      effects: effects.map((x) => x.effect),
      flavors: flavors.map((x) => x.flavor),
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
    let description = req.body.description;
    let id = req.decodedJwt.subject;
    let newPreferences = req.body;

    let exists = await Users.getListId(listName, id);
    if (exists.length > 0) {
      res.status(400).json({
        message: "A list with that name already exists.",
        error: "Try something new",
      });
    }

    await Users.addList(listName, id, description);
    //let payload = await getListObject(id);
    //console.log(payload)
    const ListId = await Users.getListId(listName, id)
    let newListId = ListId[0].id;

    let allFlavors = await Users.getEffectOrFlavorIds("flavor");
    let allEffects = await Users.getEffectOrFlavorIds("effect");

 

    let someFlavors = allFlavors.filter((flavor) => {
      return newPreferences.flavors.some(function (e) {
        return e == flavor.flavor;
      });
    });

    let someEffects = allEffects.filter((effect) => {
      return newPreferences.effects.some(function (e) {
        return e == effect.effect;
      });
    });
    let EffectArr = someEffects.map((x) => ({ list_id: newListId, effect_id: x.id }))
    let FlavorArr = someFlavors.map((x) => ({ list_id: newListId, flavor_id: x.id }))

    await Users.updatePrefs(FlavorArr, "flavor");
    await Users.updatePrefs(EffectArr, "effect");
    let payload = await getListObject(newListId);

    res.status(200).json({
      message: `you just CREATED list: ${listName}, ${user} `,
      list: payload,
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      err: err,
      errmessage: err.message,
    });
  }
});


router.get("/list/:id", restricted, async (req, res) => {
  getListObject(req.params.id)
    .then((user) => {
      res.status(200).json(user);
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

router.get("/", restricted, (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/:id", restricted, (req, res) => {
  Users.getUsers(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    await Users.remove(req.params.id);
    res
      .status(200)
      .json({ message: `${req.params.id} DELETED`, Users: req.Users });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
