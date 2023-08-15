const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const { database } = require("../DB");

const User = database.define(
  "users",
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

User.beforeCreate(async (user) => {
  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  } catch (error) {
    console.error("Error al cifrar la contraseña:", error);
    throw new Error("No se pudo cifrar la contraseña");
  }
});

module.exports = User;
