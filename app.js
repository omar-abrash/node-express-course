// lesson-05:
// will discuss :
// 1- how send html files with styling.
// 2- how deals with express.static in middleware to define static import in html styling
// 3- how use path module to define html file location in Server .

const express = require("express");
const path = require("node:path");
const PORT = 8080;

const app = express();

// Import (mainRoutes, usersRoutes) from the (./routes) folder:
const mainRoutes = require("./routes/main").mainRoutes;
const usersRoutes = require("./routes/users").usersRoutes;

// start middellware area :

// how use express.static to define static path if import style file in html
app.use(express.static(path.join(__dirname, "./public")));

// Use the imported routes
app.use("/", mainRoutes);
app.use("/users", usersRoutes);

// General middleware to catch any incoming request not applying to the previous routes ("/first", "/second")
app.use((req, res) => {
  const notFoundPage = path.join(__dirname, "./views/404.html");
  res.status(404).sendFile(notFoundPage);
});

// End middleware area

// Use the listen method to listen to all incoming requests
app.listen(PORT);
