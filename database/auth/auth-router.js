const bcryptjs = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require('../config/secrets');
const authenticate = require('../middleware/restricted');

const Users = require("../users/users-model.js");

function isValid(user) {
  return Boolean(
    user.username && user.password && typeof user.password === "string"
  );
}
function isValidPassword(user) {
  return Boolean(
    user.password && typeof user.password === "string"
  );
}

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {

    const rounds = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
      .then((user) => {
        const token = generateToken(user);
        res.status(201).json({ message: "Registration successful", data: {username: user.username, email: user.email}, token });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

router.delete('/delete-user', authenticate,(req, res) => {
  const { subject, username } = req.decodedJwt;
  Users.remove(subject)
  .then(deleted => {
    if (deleted) {
      res.json({ message: `${username} Deleted`, removed: "User Profile Permanently Deleted" });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

router.put('/change-password', authenticate,(req, res) => {
  //extract password from body so it is the only thing the user can change
  const changes = { password: req.body.password };
  const { subject, username } = req.decodedJwt;
  if (isValidPassword(changes)) {

    const rounds = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(changes.password, rounds);
    changes.password = hash;
      Users.getUsers(subject)
      .then(user => {
        if (user) {
          Users.update(changes, subject)
          .then(() => {
            res.json({message: `Password changed for ${username}`  });
          });
        } else {
          res.status(404).json({ message: 'Could not find user with given id' });
        }
      })
      .catch (err => {
        res.status(500).json({ message: 'Failed to update user' });
      });
    }else {
      res.status(400).json({
        message:
          "please provide a new password and the password shoud be alphanumeric",
      });
    }
});


//----------------------------------------------------------------------------//
// When someone successfully authenticates, reward them with a token, so they
// don't have to authenticate again.
//----------------------------------------------------------------------------//
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username: username })
      .then(([user]) => {
        // compare the password the hash stored in the database
        if (user && bcryptjs.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({
            message: `Welcome to med-cabinet ${username}`,
            token,
          });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password and the password shoud be alphanumeric",
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
  };

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
