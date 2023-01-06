require("express-async-errors");

const errors = require("../middleware/errors");
const categories = require("../routes/categories");

const helmet = require("helmet");
const compression = require("compression");
const express = require("express");

module.exports = function (app) {
  app.use(helmet());
  app.use(compression());

  app.use(express.json());

  app.use("/categories", categories);

  app.get("/ping", (req, res) => {
    res.send("pong");
  });

  app.use(errors);
};
