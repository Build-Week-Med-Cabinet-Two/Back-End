const router = require("express").Router();
//add restricted middleware to functions
const restricted = require("../middleware/restricted.js");
const Users = require("./users-model.js");

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
