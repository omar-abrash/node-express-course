// lesson-04
// will discuss :
// 1- How to make path filtering in middleware
// 2- How to export and import variables and methods in Node.js
// 3- How to use HTTP methods (GET, POST, etc.) in path filtering

// We can see a new folder in our project directory (routes).
// It consists of two files (first.js, second.js).
// Each one has many new routes (URLs) with different methods (.get, .post, etc.).

// Import express from express
const express = require("express");
// Define our PORT
const PORT = 8080;
// Define our server or app
const app = express();

// Import (firstRoutes, secondRoutes) from the (./routes) folder:
const firstRoutes = require("./routes/first").firstRoutes;
const secondRoutes = require("./routes/second").secondRoutes;

// Use the imported routes
app.use("/first", firstRoutes);
app.use("/second", secondRoutes);

// General middleware to catch any incoming request not applying to the previous routes ("/first", "/second")
app.use((req, res) => {
  console.log("404 Not Found Route");
  res.status(404).end();
});

// End middleware area

// Use the listen method to listen to all incoming requests

app.listen(PORT);
