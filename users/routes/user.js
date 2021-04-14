const express = require("express");
const { body } = require("express-validator");
const userController = require("../controller/user");
const user = require("../models/user");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .custom((value, { req }) => {
        return user.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email already exist");
          }
        });
      })
      .normalizeEmail(),
    body("userName").trim().not().isEmpty(),
    body("password").trim().not().isEmpty(),
  ],
  userController.signUp
);
router.post("/login", userController.login);

module.exports = router;
