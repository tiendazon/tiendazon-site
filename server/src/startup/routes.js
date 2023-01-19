require("express-async-errors");

const errors = require("../middleware/errors");
const categories = require("../routes/categories");
const products = require("../routes/products");
const users = require("../routes/users");
const auths = require("../routes/auths");

const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const express = require("express");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  app.use("/categories", categories);
  app.use("/products", products);
  app.use("/users", users);
  app.use("/auths", auths);

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  app.use(errors);
};
