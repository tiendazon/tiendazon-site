const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const mongoose = require("mongoose");
const { categorySchema } = require("./category");
const validator = require("../middleware/joiValidator");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: categorySchema,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

const reqSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `El campo "name" es requerido` }),

  price: Joi.number()
    .required()
    .messages({ "any.required": `El campo "price" es requerido` }),
  categoryId: Joi.objectId().required().messages({
    "any.required": `El campo "categoryId" es requerido`,
    "string.pattern.name": `El campo "categoryId" debe ser un objectId valido para mongo`,
  }),
});

exports.Product = Product;
exports.productSchema = productSchema;
exports.validateBody = validator(reqSchema);
