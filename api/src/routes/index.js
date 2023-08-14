const routes = require("express").Router();

routes.use("/refresh", require("./refreshToken"));
routes.use("/login", require("./login"));
routes.use("/user", require("./user"));
routes.use("/signout", require("./signout"));

module.exports = routes;
