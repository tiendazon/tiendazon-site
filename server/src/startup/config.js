const config = require("config");

module.exports = function () {
  if (!config.get("jwtPrivateKey")) {
    throw new Error("No se ha configurado una clave privada para jwt");
  }
};
