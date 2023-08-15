// controllers/roomController.js

const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

async function createRooms(req, res) {
  try {
    const {
      idHotel,
      numRooms,
      roomType,
      roomPrice,
      roomLocation,
      available,
      reservedFrom,
      reservedUntil,
    } = req.body;

    const hotel = await Hotel.findByPk(idHotel);

    console.log("encontre el hotel", hotel);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    const roomsToCreate = [];

    for (let i = 1; i <= numRooms; i++) {
      roomsToCreate.push({
        roomType,
        roomPrice,
        roomLocation,
        available,
        reservedFrom: new Date(reservedFrom),
        reservedUntil: new Date(reservedUntil),
        hotelId: idHotel,
      });
    }
    const roomsCreated = await Room.bulkCreate(roomsToCreate);
    hotel.addRoom(roomsCreated);

    res.status(200).json({ habitacionesCreadas: roomsCreated });
  } catch (error) {
    console.error("Error al crear las habitaciones:", error);
    res.status(200).json({ message: "Error interno del servidor" });
  }
}

module.exports = { createRooms };
