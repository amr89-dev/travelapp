const { DataTypes } = require("sequelize");
const { database } = require("../DB");
const Hotel = require("./Hotel");

const Room = database.define(
  "rooms",
  {
    idRoom: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    roomType: {
      type: DataTypes.STRING,
      defaultValue: "sencilla",
    },
    roomPrice: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    roomLocation: {
      type: DataTypes.STRING,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    reservedFrom: {
      type: DataTypes.DATE,
    },
    reservedUntil: {
      type: DataTypes.DATE,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Room;
