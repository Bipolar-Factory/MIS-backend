const { authenticateInstallation, updateInstallation } = require("../controllers/installation.controller");

const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./assets/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Supported File types are JPEG and PNG"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

const InstallationRouter = require("express").Router();

InstallationRouter.post("/", authenticateInstallation);
InstallationRouter.put("/", upload.single("cameraImage"), updateInstallation);

module.exports = InstallationRouter;