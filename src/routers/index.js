const Router = require("express").Router();
const PollingRouter = require("./polling.router");

Router.get("", (req, res) => {
  res.send("Welcome MIS Backend");
});

Router.use("/polling", PollingRouter);

module.exports = Router;