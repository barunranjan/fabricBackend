const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const QuantitySchemaroute = require("./routes/quantitySchema");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/", QuantitySchemaroute);

app.use((err, req, res, next) => {
  console.log(err);
  const status = err.statusCode || 500;
  const message = err.message || "something gone wrong";
  res.status(status).json({ message: message });
});

const schemaApp = mongoose
  .connect("mongodb://localhost:27017/demoJio")
  .then(() => {
    app.listen(9200, () => {
      console.log("quantity schema server running at port 9200");
    });
  })
  .catch((error) => {
    console.log(error);
  });

module.exports = schemaApp;
