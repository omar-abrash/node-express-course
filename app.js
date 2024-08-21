const express = require("express");
const bodyParser = require("body-parser");
const PORT = 8080;

const usersRouter = require("./routes/users").usersRouter;

const app = express();

// start middleware area
app.use(bodyParser.json());

app.use("/users", usersRouter);
//
//
//

app.use((error, req, res, next) => {
  // !error.statusCode && (error.statusCode = 500);
  if (!error.statusCode) {
    error.statusCode = 500;
  }

  res.status(error.statusCode).json({ errors: error.errors });
});

// end middleware area

app.listen(PORT);
