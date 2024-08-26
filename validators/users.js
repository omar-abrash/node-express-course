const { body } = require("express-validator");

const addUserValidation = (req, res, next) => {
  return [
    body(
      "userName",
      "user name must me String at least 5 charachers and not more than 20 characters"
    )
      .trim()
      .isString()
      .isLength({ min: 5, max: 20 }),
    body("userEmail", "user email is not valid").trim().isEmail(),
    body(
      "userPassword",
      "password must be has charachers and numbers with one special character min:8 , max:20"
    )
      .trim()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/)
      .isLength({ min: 8, max: 20 }),
    body("confirmPassword", "password not match confirm password").custom(
      (value, { req }) => {
        if (value !== req.body.userPassword) {
          throw new Error("two passwords not match!");
        }
        return true;
      }
    ),
  ];
};

module.exports = { addUserValidation };
