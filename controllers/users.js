const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/user");

// get All users :
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.getAllUsers();
    res.status(200).json({ users: users });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//

const getUser = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.getUser(userId);
    res.status(200).json({ user: user });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

//

const addNewUser = async (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;
  const errors = validationResult(req).errors;

  try {
    if (errors.length > 0) {
      let error = new Error("Form Not Valid!");
      error.errors = errors;
      error.statusCode = 400;
      return next(error);
    }

    const hashPassword = await bcrypt.hash(userPassword, 12);
    const newUser = new User(userName, userEmail, hashPassword);
    const addMessage = await newUser.addNewUser();
    res.status(201).json({ message: addMessage });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

module.exports = { getAllUsers, getUser, addNewUser };
