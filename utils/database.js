const mysql = require("mysql2");

const poolConnection = mysql.createPool({
  host: "localhost",
  user: "",
  password: "",
  database: "training",
});

const db = poolConnection.promise();

module.exports = db;
