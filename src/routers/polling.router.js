const {
  createPolling,
  getSupervisorPolling,
  specificPolling,
} = require("../controllers/polling.controller");
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

const PollingRouter = require("express").Router();

PollingRouter.get("/:supervisor_id/:ac_no/:ps_no", specificPolling);
PollingRouter.get("/:supervisor_id", getSupervisorPolling);
PollingRouter.post("/", upload.single("cameraImage"), createPolling);

module.exports = PollingRouter;
