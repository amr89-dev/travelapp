require("dotenv").config();
const server = require("./src/app.js");
const { PORT } = process.env;
const { database } = require("./src/DB.js");

server.listen(PORT, (req, res) => {
  console.log(`server raised in port ${PORT}`);
  database.sync({ force: true });
});
