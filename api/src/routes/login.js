const loginRoutes = require("express").Router();

loginRoutes.get("/", (req, res) => {
  res.send("Estoy en la ruta de login");
});

module.exports = loginRoutes;
