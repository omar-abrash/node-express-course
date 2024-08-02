// To create new routers in Express.js, we need to import "express" first
const express = require("express");
// Define a new router using the .Router() method from express
const firstRoutes = express.Router();

// Now add all cases depending on our business logic:
// Base URL: /first
firstRoutes.get("/", (req, res, next) => {
  console.log("You are in /first with GET");
  res.end();
});

// /first/one
firstRoutes.get("/one", (req, res, next) => {
  console.log("You are in /first/one with GET");
  res.end();
});

// /first/two
firstRoutes.post("/two", (req, res, next) => {
  console.log("You are in /first/two with POST");
  res.end();
});

// Export the firstRoutes router
module.exports = { firstRoutes };
