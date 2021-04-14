const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const quantitySchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    vertical: {
      required: true,
      type: String,
    },
    domain: {
      required: true,
      type: String,
    },
    group: {
      required: true,
      type: String,
    },
    unit: {
      required: true,
      type: String,
    },
    schemaType: {
      required: true,
      type: String,
    },
    schema: {
      required: true,
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);
/**
 * method to convert mongodb._id to id
 * it will not refelect in db
 */
mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  },
});

module.exports = mongoose.model("QuantitySchema", quantitySchema);
