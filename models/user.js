const db = require("../utils/database");

class User {
  constructor(userName, userEmail, userPassword) {
    this.name = userName;
    this.email = userEmail;
    this.password = userPassword;
  }
  // static (excute static method without create new Object)
  static async getAllUsers() {
    // connect with db to return all users
    const dbResult = await db.execute("SELECT * FROM users");
    const [rows] = dbResult;
    return rows;
  }
  // static (excute static method without create new Object)
  static async getUser(userId) {
    const dbResult = await db.execute(`SELECT * FROM users WHERE id=${userId}`);
    const [rows] = dbResult;
    return rows;
  }
  // (excute public methoud after create new object)
  async addNewUser() {
    // connect with db to add user
    await db.execute(`INSERT INTO users (name,email,password) VALUES (?,?,?)`, [
      this.name,
      this.email,
      this.password,
    ]);
    return "add new user success";
  }

  //
}

module.exports = User;
