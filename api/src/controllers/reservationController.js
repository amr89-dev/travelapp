const { Sequelize } = require("sequelize");
const Reservation = require("../models/Reservation");
const Room = require("../models/Room");

async function getReservations(req, res) {
  try {
    const reservation = await Reservation.findAll();

    return res.status(200).json(reservation);
  } catch (error) {
    console.log(error);
  }
}
async function createReservation(req, res) {
  try {
    const { idRoom, checkInDate, checkOutDate, userId } = req.body;
    if (!idRoom || !checkInDate || !checkOutDate) {
      res.status(401).json({ error: "Faltan datos para la reserva" });
    }
    const room = await Room.findByPk(idRoom);

    if (!room) {
      return res.status(404).json({ message: "Habitación no encontrada" });
    }
    const existingReservation = await Reservation.findOne({
      where: {
        roomId: idRoom,
        [Sequelize.Op.or]: [
          {
            checkInDate: {
              [Sequelize.Op.lte]: new Date(checkOutDate),
            },
            checkOutDate: {
              [Sequelize.Op.gte]: new Date(checkInDate),
            },
          },
        ],
      },
    });

    if (existingReservation) {
      return res
        .status(409)
        .json({ message: "La habitación no está disponible en esas fechas" });
    }
    const newReservation = await Reservation.create({
      roomId: idRoom,
      checkInDate: new Date(checkInDate),
      checkOutDate: new Date(checkOutDate),
      userId,
    });

    res.status(200).json({ reservation: newReservation });
  } catch (error) {
    console.log(error);
  }
}

async function updateReservation(req, res) {
  try {
    const { id } = req.params;
    const { checkInDate, checkOutDate } = req.body;

    const reservationToUpdate = await Reservation.findByPk(id);

    if (!reservationToUpdate) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    reservationToUpdate.checkInDate = checkInDate;
    reservationToUpdate.checkOutDate = checkOutDate;

    await reservationToUpdate.save();

    res.status(200).json(reservationToUpdate);
  } catch (error) {
    console.error("Error al actualizar la reserva", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function deleteReservation(req, res) {
  const { id } = req.params;

  try {
    const reservationToDelete = await Reservation.findByPk(id);

    if (!reservationToDelete) {
      return res.status(404).json({ message: "Hotel no encontrado" });
    }

    await reservationToDelete.destroy();
    res.status(204).json({ message: "Reserva eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar el hotel:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  createReservation,
  getReservations,
  updateReservation,
  deleteReservation,
};
