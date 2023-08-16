const {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
} = require("../controllers/hotelController");

const hotelRoutes = require("express").Router();

hotelRoutes.get("/", (req, res) => {
  getHotels(req, res);
});
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
