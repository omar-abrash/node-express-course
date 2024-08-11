const express = require("express");
// import path module to determine the html file location in server :
const path = require("node:path");

const mainRoutes = express.Router();

// to get home page in route /
mainRoutes.get("/", (req, res, next) => {
  // locate the mainPage using path module with .join method
  const mainPage = path.join(__dirname, "../views/home.html");
  res.status(200).sendFile(mainPage);
});

module.exports = { mainRoutes };
