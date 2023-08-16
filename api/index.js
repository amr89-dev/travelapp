require("dotenv").config();
const server = require("./src/app.js");
const { database } = require("./src/DB.js");
const loadHotels = require("./src/helper/hotelDB.js");

const PORT = process.env.PORT || 3001;

const main = async () => {
  try {
    await database.authenticate();
    console.log("La conexion a la base de datos es exitosa");

    await loadHotels();
    server.listen(PORT, (req, res) => {
      console.log(`server raised in port ${PORT}`);
      database.sync({ force: false });
    });
  } catch (error) {
    console.log("-->", error);
  }
};
main();
