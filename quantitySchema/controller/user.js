const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.signUp = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("validation failed");
    error.statusCode = 422;
    error.data = error.array();
    throw error;
  }
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashPw) => {
      const user = new User({
        email: email,
        username: username,
        password: hashPw,
      });
      return user.save().then((result) => {
        res.status(201).json({ message: "user created", userId: result._id });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
