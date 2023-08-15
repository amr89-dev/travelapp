const { createRooms } = require("../controllers/roomController");

const roomRoutes = require("express").Router();

roomRoutes.post("/", (req, res) => {
  createRooms(req, res);
});

module.exports = roomRoutes;
