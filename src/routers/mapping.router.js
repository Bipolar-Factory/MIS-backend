const { authenticateId, updateMapping, deleteMapping, createMapping } = require("../controllers/mapping.controller");

const MappingRouter = require("express").Router();

MappingRouter.post("/create", createMapping);
MappingRouter.delete("/", deleteMapping);
MappingRouter.post("/", authenticateId);
MappingRouter.put("/", updateMapping);

module.exports = MappingRouter;
