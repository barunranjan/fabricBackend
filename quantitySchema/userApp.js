const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoute = require("./routes/user");

const userApp = express();

userApp.use(bodyParser.json());

userApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

userApp.use("/", userRoute);

userApp.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || "something gone wrong";
  res.status(status).json({ message: message });
});

const userApplication = mongoose
  .connect("mongodb://localhost:27017/demoJio")
  .then(() => {
    userApp.listen(8000, () => {
      console.log("user server running on 8000");
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = userApplication;
