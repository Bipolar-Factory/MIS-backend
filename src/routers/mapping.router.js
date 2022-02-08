const { authenticateId, updateMapping } = require("../controllers/mapping.controller");

const MappingRouter = require("express").Router();

MappingRouter.post("/", authenticateId);
MappingRouter.put("/", updateMapping);

module.exports = MappingRouter;
