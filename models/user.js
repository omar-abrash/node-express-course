class User {
  constructor(userEmail, userPassword) {
    this.email = userEmail;
    this.password = userPassword;
  }
  // static (excute static method without create new Object)
  static getAllUsers() {
    // connect with db to return all users
    return "Get All Users";
  }
  // static (excute static method without create new Object)
  static getUser(userId) {
    // connect with db to get user depend on userId
    return "Get User";
  }
  // (excute public methoud after create new object)
  addNewUser() {
    // connect with db to add user
    return "Add New User";
  }

  //
}

module.exports = User;
