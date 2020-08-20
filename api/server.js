const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authenticate = require('../database/middleware/restricted');

const usersRouter = require('../database/users/users-router')
const authRouter = require('../database/auth/auth-router');
const checkRole = require('../database/middleware/check-usertype');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/", authRouter);
server.use("/api/users", authRouter, usersRouter);

server.get("/", checkRole(1), (req, res) => {
    res.status(200).json({ api: "up and ATOM" });
  });
  
  module.exports = server;