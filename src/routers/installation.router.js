const { authenticateInstallation, updateInstallation } = require("../controllers/installation.controller");

const InstallationRouter = require("express").Router();

InstallationRouter.post("/", authenticateInstallation);
InstallationRouter.put("/", updateInstallation);

module.exports = InstallationRouter;
