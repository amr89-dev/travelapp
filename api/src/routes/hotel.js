const {
  createHotel,
  updateHotel,
  deleteHotel,
} = require("../controllers/hotelController");

const hotelRoutes = require("express").Router();

hotelRoutes.post("/", (req, res) => {
  createHotel(req, res);
});
hotelRoutes.put("/:id", (req, res) => {
  updateHotel(req, res);
});
hotelRoutes.delete("/:id", (req, res) => {
  deleteHotel(req, res);
});

module.exports = hotelRoutes;
