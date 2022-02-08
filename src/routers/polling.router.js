const { createPolling, getAllPolling } = require("../controllers/polling.controller");

const PollingRouter = require("express").Router();

PollingRouter.post("/", createPolling);
PollingRouter.get("/", getAllPolling);

module.exports = PollingRouter;
