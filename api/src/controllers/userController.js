const User = require("../models/User");
const { randomUUID } = require("crypto");

async function postUser(req, res) {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      res
        .status(401)
        .json({ error: "Faltan datos name, username, email, password" });
    }
    const usernameMatch = await User.findOne({ where: { username } });

    if (usernameMatch) {
      return res.status(401).json({ message: "Nombre de usuario ya existe" });
    }
    let newUser = await User.create({
      id: randomUUID(),
      username,
      password,
      name,
    });

    res.status(200).json({
      usuarioCreado: newUser,
    });
  } catch (err) {
    res.status(500).json({ message: "Ocurrió un error" });
    console.log("error -->", err);
  }
}

module.exports = { postUser };
