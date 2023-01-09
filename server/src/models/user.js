const config = require("config");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const _ = require("lodash");
const mongoose = require("mongoose");
const validator = require("../middleware/joiValidator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: Boolean,
});

userSchema.methods.generateToken = function () {
  return jwt.sign(
    _.pick(this, ["_id", "name", "isAdmin"]),
    config.get("jwtPrivateKey")
  );
};

const User = mongoose.model("User", userSchema);

const reqSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ "any.required": `El campo "name" es requerido` }),
  email: Joi.string()
    .required()
    .email()
    .messages({ "any.required": `El campo "email" es requerido` }),
  password: Joi.string()
    .required()
    .messages({ "any.required": `El campo "password" es requerido` }),
});

exports.User = User;
exports.validateBody = validator(reqSchema);
