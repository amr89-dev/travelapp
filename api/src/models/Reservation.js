const { DataTypes } = require("sequelize");
const { database } = require("../DB");

const Reservation = database.define(
  "reservations",
  {
    idReservation: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },

    checkInDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOutDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Reservation;
