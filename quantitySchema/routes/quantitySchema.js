const express = require("express");
const { body } = require("express-validator");
const quantitySchemaController = require("../controller/quantitySchema");

const router = express.Router();

router.post(
  "/quantitySchema/numeric",
  quantitySchemaController.addQuantitySchema
);
router.post(
  "/quantitySchema/symbolic",
  quantitySchemaController.addQuantitySchema
);
router.post("/quantitySchema", quantitySchemaController.addQuantitySchema);

router.get("/quantitySchema", quantitySchemaController.getQuantitySchema);

router.get(
  "/quantitySchema/:quantitySchemaId",
  quantitySchemaController.getQuantitySchemaById
);
router.put(
  "/quantitySchema/:quantitySchemaId",

  quantitySchemaController.updateQuantitySchema
);
router.put(
  "/quantitySchema/numeric/:quantitySchemaId",

  quantitySchemaController.updateQuantitySchema
);
router.put(
  "/quantitySchema/symbolic/:quantitySchemaId",

  quantitySchemaController.updateQuantitySchema
);

router.delete(
  "/quantitySchema/:quantitySchemaId",
  quantitySchemaController.deleteQuantitySchema
);

module.exports = router;
