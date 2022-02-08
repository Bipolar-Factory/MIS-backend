const { authenticateId, updateMapping, deleteMapping } = require("../controllers/mapping.controller");

const MappingRouter = require("express").Router();

MappingRouter.delete("/", deleteMapping);
MappingRouter.post("/", authenticateId);
MappingRouter.put("/", updateMapping);

module.exports = MappingRouter;
