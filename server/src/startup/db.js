const config = require("config");
const winston = require("winston");
const mongoose = require("mongoose");

module.exports = function () {
  mongoose
    .connect(config.get("db"), { useUnifiedTopology: true })
    .then(() => winston.info("Conectado a mongodb..."));
};
