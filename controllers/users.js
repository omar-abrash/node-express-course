const User = require("../models/user");

const getAllUsers = async (req, res, next) => {
  const users = await User.getAllUsers();

  res.status(200).json({ users: users });
};

const getUser = async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.getUser(userId);

  res.status(200).json({ user: user });
};

const addNewUser = async (req, res, next) => {
  const { userEmail, userPassword } = req.body;

  const newUser = new User(userEmail, userPassword);

  const addMessage = await newUser.addNewUser();

  res.status(201).json({ message: addMessage });
};

module.exports = { getAllUsers, getUser, addNewUser };
