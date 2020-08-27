const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authenticate = require('../database/middleware/restricted');
//const listsRouter = require('../database/users/lists-router')
const usersRouter = require('../database/users/users-router')
const authRouter = require('../database/auth/auth-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/auth", authRouter);
server.use("/users", authenticate, usersRouter);
//server.use("/lists", authenticate, listsRouter);

server.get("/", (req, res) => {
    res.status(200).json({ api: "up and ATOM" });
  });
  
  module.exports = server;