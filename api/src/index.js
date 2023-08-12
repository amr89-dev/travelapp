const express = require("express");

const server = express();

server
  .get("/", (req, res) => {
    res.send("Probando el back");
  })
  .listen(3001, () => {
    console.log(`Servidor corriendo en el puerto ${3001}`);
  });
