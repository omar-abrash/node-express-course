const express = require("express");
const path = require("node:path");
const fs = require("node:fs");

const usersRoutes = express.Router();

// to get users page in route /users
usersRoutes.get("/", (req, res, next) => {
  // define where is the users page using (path) module.
  const usersPage = path.join(__dirname, "../views/users.ejs");
  // read the users array from (users.json) file :
  const usersFile = path.join(__dirname, "../users.json");
  const users = fs.readFileSync(usersFile, "utf-8");
  const usersArray = JSON.parse(users);

  res.status(200).render(usersPage, { users: usersArray });
});

// to get users page in route /users/add-user
usersRoutes.get("/add-user", (req, res, next) => {
  const addUserPage = path.join(__dirname, "../views/add-user.html");
  res.status(200).sendFile(addUserPage);
});

// to get users page in route /users/add-user
usersRoutes.post("/add-user", (req, res, next) => {
  // to parsing Incomming Request will use req.body
  const body = req.body;
  const userName = body.userName;
  const usersFile = path.join(__dirname, "../users.json");
  const users = fs.readFileSync(usersFile, "utf-8");
  const usersArray = JSON.parse(users);
  usersArray.push(userName);

  // re-write (users.json) file with new userName
  fs.writeFileSync(usersFile, JSON.stringify(usersArray));

  // redirect to users page after add new userName in (users.json) file
  res.redirect("/users");
});

module.exports = { usersRoutes };
