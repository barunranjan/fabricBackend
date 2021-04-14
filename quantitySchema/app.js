const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const QuantitySchemaroute = require("./routes/quantitySchema");
const userRoute = require("./routes/user");

const quantitySchemaApp = express();
const userApp = express();

quantitySchemaApp.use(bodyParser.json());
userApp.use(bodyParser.json());

quantitySchemaApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

userApp.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

quantitySchemaApp.use("/", QuantitySchemaroute);
userApp.use("/", userRoute);

quantitySchemaApp.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || "something gone wrong";
  res.status(status).json({ message: message });
});
userApp.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || "something gone wrong";
  res.status(status).json({ message: message });
});

mongoose
  .connect("mongodb://localhost:27017/demoJio")
  .then(() => {
    userApp.listen(8000, () => {
      console.log("user server running on 8000");
    });
    quantitySchemaApp.listen(9200, () => {
      console.log("quantity schema server running at port 9200");
    });
  })
  .catch((error) => {
    console.log(error);
  });
