const User = require("../models/User");

async function postUser(req, res) {
  try {
    const { name, lastName, email, password } = req.body;
    console.log({ name, lastName, email, password });

    if (!name || !lastName || !email || !password) {
      res
        .status(401)
        .json({ error: "Faltan datos name, lastName, email, password" });
    }

    let newUser = await User.create({
      id: 1,
      username: lastName,
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
