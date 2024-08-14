// lesson-06:
// will discuss :
// 1- How to Install and use Templating Engine to render Dynamic Data In HTML Pages.
// 2- How to install and use body-parser package to parsing body request.

const express = require("express");
const path = require("node:path");
const bodyParser = require("body-parser");
const PORT = 8080;

// Import (mainRoutes, usersRoutes) from the (./routes) folder:
const mainRoutes = require("./routes/main").mainRoutes;
const usersRoutes = require("./routes/users").usersRoutes;

const app = express();

// start middellware area :

// define templating engine EJS :
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

// define bodyParser package to use it in parsing incoming request body :
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// how use express.static to define static path if import style file in html
app.use(express.static(path.join(__dirname, "./public")));

// Use the imported routes
app.use("/", mainRoutes);
app.use("/users", usersRoutes);

// General middleware to catch any incoming request not applying to the previous routes ("/first", "/second")
app.use((req, res) => {
  const notFoundPage = path.join(__dirname, "./views/404.ejs");
  // handle url error page with templating engine :
  const url = req.url;
  // render worng URL with error templating engine :
  res.status(404).render(notFoundPage, { url });
});

// End middleware area

// Use the listen method to listen to all incoming requests
app.listen(PORT);
