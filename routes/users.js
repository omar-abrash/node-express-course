const express = require("express");
const usersRouter = express.Router();

const getAllUsers = require("../controllers/users").getAllUsers;
const getUser = require("../controllers/users").getUser;
const addNewUser = require("../controllers/users").addNewUser;

// request from "/users"
usersRouter.get("/", getAllUsers);

// request "/users/:id"
usersRouter.get("/:id", getUser);

// post "/users"
usersRouter.post("/", addNewUser);

module.exports = { usersRouter };
