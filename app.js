// Express Js Fundumentalis :
// we will discusss :
// 1- Install Express Js
// 2- middleware fundumentals.

// before define express app should be install express !
// run (npm i express) Or (npm i express --save-dev) In terminal
// you can see express in package.json file : "dependencies": { "express": "^4.19.2"}

// define express from express
const express = require("express");
// define our PORT
const PORT = 8080;
// define our server Or app
const app = express();

// This Area to use middleware to handle all incoming requests:
// the main middleware is .use method
// .use() without detrimned any path : accept all incoming Request

// app.use(() => { console.log("Incomming Request ")});
// app.use("/",()=> {}) with specephic path accep all incomming request in this path

// the anonoumus function in the middleware consist of 3 params : (req,res,next)=> {}
// req  : incoming request (object)
// res  : response will send to client (object)
// next : important method to move next middleware if busniess need that !

app.use("/", (req, res, next) => {
  console.log("First use middleware");
  next();
});

app.use("/", (req, res, next) => {
  console.log("Second use middleware");
  res.status(200).send("you reach to second route");
});

app.use((req, res) => {
  console.log("404 Not found Route");
  res.status(404).end();
});

// end middleware area

// use listen method to listen to all incomming request.
app.listen(PORT);
