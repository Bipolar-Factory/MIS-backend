const { authenticateId, updateMapping, deleteMapping, createMapping, getSupervisorMapping } = require("../controllers/mapping.controller");

const MappingRouter = require("express").Router();

MappingRouter.post("/create", createMapping);
MappingRouter.get("/:supervisor_id", getSupervisorMapping);
MappingRouter.delete("/", deleteMapping);
MappingRouter.post("/", authenticateId);
MappingRouter.put("/", updateMapping);

module.exports = MappingRouter;
