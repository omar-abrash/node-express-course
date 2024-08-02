// To create new routers in Express.js, we need to import "express" first
const express = require("express");
// Define a new router using the .Router() method from express
const secondRoutes = express.Router();

// Now add all cases depending on our business logic:
// Base URL: /second
secondRoutes.get("/", (req, res, next) => {
  console.log("You are in /second with GET");
  res.end();
});

// /second/one
secondRoutes.get("/one", (req, res, next) => {
  console.log("You are in /second/one with GET");
  res.end();
});

// /second/two
secondRoutes.post("/two", (req, res, next) => {
  console.log("You are in /second/two with POST");
  res.end();
});

// Export the secondRoutes router
module.exports = { secondRoutes };
