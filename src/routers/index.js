const Router = require("express").Router();
const PollingRouter = require("./polling.router");
const MappingRouter = require("./mapping.router");

Router.get("", (req, res) => {
  res.send("Welcome MIS Backend");
});

Router.use("/polling", PollingRouter);
Router.use("/mapping", MappingRouter);

module.exports = Router;