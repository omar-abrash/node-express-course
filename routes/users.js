const express = require("express");
const path = require("node:path");

const usersRoutes = express.Router();

// to get users page in route /users
usersRoutes.get("/", (req, res, next) => {
  const usersPage = path.join(__dirname, "../views/users.html");
  res.status(200).sendFile(usersPage);
});

// to get users page in route /users/add-user
usersRoutes.get("/add-user", (req, res, next) => {
  const addUserPage = path.join(__dirname, "../views/add-user.html");
  res.status(200).sendFile(addUserPage);
});

module.exports = { usersRoutes };
