const router = require("express").Router();
//add restricted middleware to functions
const restricted = require("../middleware/restricted.js");
const Users = require("./users-model.js");

async function getListObject(list_id) {
  try {
    const name = await Users.getList(list_id)
    const effects = await  Users.getEffects(list_id)
    const flavors = await  Users.getFlavors(list_id)
    const list = {
      listName: name[0].listName,
      description: name[0].userDescription,
      effects: effects.map((x)=> x.effect),
      flavors: flavors.map((x)=> x.flavor)
    }
    return list;
  } catch (err) {
    return err.message;
  }
}

router.get("/list/:id", restricted, async (req, res) => {
  getListObject(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/lists/:id", restricted, (req, res) => {
  Users.getLists(req.params.id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/lists/e/:id", restricted, (req, res) => {
  Users.getEffects(req.params.id)
    .then((effects) => {
      let EffectResults = effects.map((x)=> x.effect)
      res.status(200).json(EffectResults);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

router.get("/lists/f/:id", restricted, (req, res) => {
  Users.getFlavors(req.params.id)
    .then((flavors) => {
      let FlavorResults = flavors.map((x)=> x.flavor)
      res.status(200).json(FlavorResults);
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
