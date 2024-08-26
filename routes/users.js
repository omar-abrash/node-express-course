const express = require("express");
const usersRouter = express.Router();

// controllers
const getAllUsers = require("../controllers/users").getAllUsers;
const getUser = require("../controllers/users").getUser;
const addNewUser = require("../controllers/users").addNewUser;

// validators
const addUserValidation = require("../validators/users").addUserValidation;

// request from "/users"
usersRouter.get("/", getAllUsers);

// request "/users/:id"
usersRouter.get("/:id", getUser);

// post "/users"
usersRouter.post("/", addUserValidation(), addNewUser);

module.exports = { usersRouter };
