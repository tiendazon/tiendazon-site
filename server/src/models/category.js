const Joi = require("joi");
const mongoose = require("mongoose");
const validator = require("../middleware/joiValidator");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);

const reqSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `El campo "name" es requerido` }),
});

exports.Category = Category;
exports.categorySchema = categorySchema;
exports.validateBody = validator(reqSchema);
