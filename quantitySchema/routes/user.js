const express = require("express");
const userController = require("../controller/user");

const userRouter = express.Router();

userRouter.post("/signup", userController.signUp);

module.exports = userRouter;
