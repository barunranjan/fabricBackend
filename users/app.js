const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/", userRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || "something gone wrong";
  const data = err.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect("mongodb://localhost:27017/demoJio").then(() => {
  app.listen(8000, () => {
    console.log('"server running at port 8000"');
  });
});
