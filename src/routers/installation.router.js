const { authenticateInstallation, updateInstallation } = require("../controllers/installation.controller");

const InstallationRouter = require("express").Router();

InstallationRouter.get("/:ac_no/:ps_no", authenticateInstallation);
InstallationRouter.put("/", updateInstallation);

module.exports = InstallationRouter;
