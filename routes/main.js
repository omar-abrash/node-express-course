const express = require("express");
// import path module to determine the html file location in server :
const path = require("node:path");

const mainRoutes = express.Router();

// to get home page in route /
mainRoutes.get("/", (req, res, next) => {
  // locate the mainPage using path module with .join method ( Now will use Templating Engine to render some data :)
  const mainPage = path.join(__dirname, "../views/home.ejs");
  res
    .status(200)
    .render(mainPage, { title: "Main Page From EJS Templating Engine" });
});

module.exports = { mainRoutes };
