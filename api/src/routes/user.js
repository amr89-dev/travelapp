const { postUser } = require("../controllers/userController");

const userRoutes = require("express").Router();

userRoutes.post("/", (req, res) => {
  postUser(req, res);
});

module.exports = userRoutes;
