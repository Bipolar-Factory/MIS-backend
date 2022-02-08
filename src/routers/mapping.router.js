const { authenticateId } = require("../controllers/mapping.controller");

const MappingRouter = require("express").Router();

MappingRouter.post("/", authenticateId);

module.exports = MappingRouter;
