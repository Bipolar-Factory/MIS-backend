const Router = require("express").Router();
const PollingRouter = require("./polling.router");
const MappingRouter = require("./mapping.router");
const SurveyRouter = require("./survey.router");
const InstallationRouter = require("./installation.router");

Router.get("", (req, res) => {
  res.send("Welcome MIS Backend");
});

Router.use("/polling", PollingRouter);
Router.use("/mapping", MappingRouter);
Router.use("/installation", InstallationRouter);
Router.use("/survey", SurveyRouter);

module.exports = Router;