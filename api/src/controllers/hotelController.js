const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

async function getHotels(req, res) {
  try {
    const hotelsWithRooms = await Hotel.findAll({
      include: [
        {
          model: Room,
          as: "rooms",
        },
      ],
    });

    return res.status(200).json(hotelsWithRooms);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function getHotelDetail(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
  } catch (error) {}
}
async function createHotel(req, res) {
  try {
    const { name, address, city, country, description } = req.body;
    if (!name || !address || !city || !country) {
      return res.status(401).json({ message: "Faltan datos para le registro" });
    }
    const hotelMatch = await Hotel.findOne({ where: { name, address } });

    if (hotelMatch) {
      return res
        .status(401)
        .json({ message: "Hotel que intentas crear ya existe" });
    }

    const newHotel = await Hotel.create({
      name,
      address,
      city,
      country,
      description,
    });

    return res.status(200).json({
      hotelCreado: newHotel,
    });
  } catch (error) {
    console.error("Error al crear el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function updateHotel(req, res) {
  try {
    const { id } = req.params;
    const { name, address, city, country, description } = req.body;

    const hotelToUpdate = await Hotel.findByPk(id);

    if (!hotelToUpdate) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    hotelToUpdate.name = name ?? hotelToUpdate.name;
    hotelToUpdate.address = address ?? hotelToUpdate.address;
    hotelToUpdate.city = city ?? hotelToUpdate.city;
    hotelToUpdate.country = country ?? hotelToUpdate.country;
    hotelToUpdate.description = description ?? hotelToUpdate.description;

    await hotelToUpdate.save();

    res.status(200).json(hotelToUpdate);
  } catch (error) {
    console.error("Error al actualizar el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function deleteHotel(req, res) {
  const { id } = req.params;

  try {
    const hotelToDelete = await Hotel.findByPk(id);

    if (!hotelToDelete) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    await hotelToDelete.destroy();
    res.status(204).json({ message: "Hotel eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}
module.exports = {
  createHotel,
  updateHotel,
  deleteHotel,
  getHotels,
  getHotelDetail,
};
