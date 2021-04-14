const User = require("../models/user");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signUp = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("validation failed");
    error.statusCode = 422;
    error.data = error.array();
    throw error;
  }
  const userName = req.body.userName;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt
    .hash(password, 12)
    .then((hashPw) => {
      const user = new User({
        email: email,
        userName: userName,
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

exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  let loadedUser;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error("email not found");
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password).then((isEqual) => {
        if (!isEqual) {
          const error = new Error("Wrong Password");
          error.statusCode = 401;
          throw error;
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString(),
          },
          "secret",
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({
            token: token,
            message: "logged in successfuly",
            userId: loadedUser._id.toString(),
          });
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
