const Quantity = require("../models/quantitySchema");
const { validationResult } = require("express-validator");

exports.addQuantitySchema = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("validation failed");
    error.statusCode = 422;
    throw error;
  }
  const name = req.body.name;
  const vertical = req.body.vertical;
  const domain = req.body.domain;
  const group = req.body.group;
  const unit = req.body.unit;
  const schemaType = req.body.schemaType;
  const schema = req.body.schema;

  const quantitySchema = new Quantity({
    name: name,
    vertical: vertical,
    domain: domain,
    group: group,
    unit: unit,
    schemaType: schemaType,
    schema: schema,
  });
  quantitySchema
    .save()
    .then((result) => {
      res.status(200).json({
        message: "quantitySchema",
        data: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};

exports.getQuantitySchema = (req, res, next) => {
  Quantity.find()
    .then((result) => {
      res.status(200).json({
        message: "quantiy schema fetched",
        data: result,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
exports.getQuantitySchemaById = (req, res, next) => {
  const quantitySchemaId = req.params.quantitySchemaId;
  Quantity.findById(quantitySchemaId)

    .then((quantitySchema) => {
      if (!quantitySchema) {
        const error = new Error("Quantity Schema not found");
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: "Quantity Schema fetched",
        data: quantitySchema,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
exports.updateQuantitySchema = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    const error = new Error("Validation fail");
    error.statusCode = 422;
    throw error;
  }
  const quantitySchemaId = req.params.quantitySchemaId;
  Quantity.findById(quantitySchemaId)
    .then((quantitySchema) => {
      if (!quantitySchema) {
        const error = new Error("No Post found");
        error.statusCode = 404;
        throw error;
      }
      quantitySchema.name = req.body.name;
      quantitySchema.vertical = req.body.vertical;
      quantitySchema.domain = req.body.domain;
      quantitySchema.group = req.body.group;
      quantitySchema.unit = req.body.unit;
      quantitySchema.schemaType = req.body.schemaType;
      quantitySchema.schema = req.body.schema;
      return quantitySchema.save();
    })
    .then((quantitySchema) => {
      res.status(200).json({
        message: "Quantity Schema updated",
        data: quantitySchema,
      });
    })
    .catch((error) => {
      if (!error.statusCode) {
        error.statusCode = 500;
      }
      next(error);
    });
};
exports.deleteQuantitySchema = (req, res, next) => {
  const quantitySchemaId = req.params.quantitySchemaId;
  Quantity.findByIdAndRemove(quantitySchemaId)
    .then(() => {
      res.status(200).json({ message: "quantity Schema deleted successfully" });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
