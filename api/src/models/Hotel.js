const { DataTypes } = require("sequelize");
const { database } = require("../DB");
const Room = require("./Room");

const Hotel = database.define(
  "hotels",
  {
    idHotel: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    available: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

Hotel.hasMany(Room, {
  foreignKey: "hotelId",
  sourceKey: "idHotel",
});
Room.hasMany(Hotel, {
  foreignKey: "roomsId",
  targetId: "idRoom",
});
module.exports = Hotel;
