const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    quantitySchema: [
      {
        type: Schema.Types.ObjectId,
        ref: "QuantitySchema",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
