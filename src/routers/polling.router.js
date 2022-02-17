const {
  createPolling,
  getSupervisorPolling,
  specificPolling,
} = require("../controllers/polling.controller");

const PollingRouter = require("express").Router();

PollingRouter.get("/:supervisor_id/:ac_no/:ps_no", specificPolling);
PollingRouter.get("/:supervisor_id", getSupervisorPolling);
PollingRouter.post("/", createPolling);

module.exports = PollingRouter;
