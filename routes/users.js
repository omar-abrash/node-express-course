const express = require("express");
const path = require("node:path");
const fs = require("node:fs");

const usersRoutes = express.Router();

// to get all users page in route /users
usersRoutes.get("/", (req, res, next) => {
  const query = req.query;
  const { name, age } = query;
  // define where is the users page using (path) module.
  // const usersPage = path.join(__dirname, "../views/users.ejs");
  // read the users array from (users.json) file :
  const usersFile = path.join(__dirname, "../users.json");
  const users = fs.readFileSync(usersFile, "utf-8");
  const usersArray = JSON.parse(users);
  //
  let finalUsersArray;
  //
  const usersArrayAfterFilteration = usersArray.filter((user) =>
    user.name.includes(name)
  );

  if (usersArrayAfterFilteration.length === 0) {
    finalUsersArray = usersArray;
  } else {
    finalUsersArray = usersArrayAfterFilteration;
  }

  // res.status(200).render(usersPage, { users: usersArray });
  res.status(200).json({ users: finalUsersArray });
});

// build new route in /users/:id to get spesphic user :
usersRoutes.get("/:id", (req, res, next) => {
  const id = req.params.id;
  // read the users array from (users.json) file :
  const usersFile = path.join(__dirname, "../users.json");
  const users = fs.readFileSync(usersFile, "utf-8");
  const usersArray = JSON.parse(users);
  const user = usersArray.filter((userObject) => userObject.id === +id);

  res.status(200).json({ user: user });
  //
});

// delete method on /users/:id
usersRoutes.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  // read the users array from (users.json) file :
  const usersFile = path.join(__dirname, "../users.json");
  const users = fs.readFileSync(usersFile, "utf-8");
  const usersArray = JSON.parse(users);
  const usersAfterDeleted = usersArray.filter(
    (userObject) => userObject.id !== +id
  );

  res
    .status(201)
    .json({ user: usersAfterDeleted, mesg: "user is deleted successfully" });
});

// put method on /users/:id
usersRoutes.put("/:id", (req, res, next) => {
  const id = req.params.id;
  const newName = req.body.newName;
  // read the users array from (users.json) file :
  const usersFile = path.join(__dirname, "../users.json");
  const users = fs.readFileSync(usersFile, "utf-8");
  const usersArray = JSON.parse(users);

  const updatedUser = usersArray.find((userObj) => userObj.id === +id);
  updatedUser.name = newName;
  const usersWithoutUpdatedUser = usersArray.filter(
    (userObj) => userObj.id !== +id
  );
  const newUpdatedUsers = [updatedUser, ...usersWithoutUpdatedUser];

  res
    .status(201)
    .json({ users: newUpdatedUsers, mesg: "update user correctlly" });
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

  const userObject = {
    id: Math.random(),
    name: userName,
  };
  usersArray.push(userObject);

  // re-write (users.json) file with new userName
  fs.writeFileSync(usersFile, JSON.stringify(usersArray));

  res.status(201).json({ user: userObject, mesg: "add new user succesfully " });
});

module.exports = { usersRoutes };
