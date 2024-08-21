const User = require("../models/user");

const getAllUsers = (req, res, next) => {
  console.log(User.getAllUsers());
  res.end();
};

const getUser = (req, res, next) => {
  const userId = req.params.id;
  console.log(User.getUser(userId));

  res.end();
};

const addNewUser = (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  const newUser = new User(userEmail, userPassword);

  console.log(newUser.addNewUser());

  res.end();
};

module.exports = { getAllUsers, getUser, addNewUser };
