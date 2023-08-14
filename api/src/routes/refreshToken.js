const refreshTokenRoutes = require("express").Router();

refreshTokenRoutes.get("/", (req, res) => {
  res.send("Estoy en la ruta de refreshTokenRoutes");
});

module.exports = refreshTokenRoutes;
