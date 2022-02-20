const { db } = require("../database/firebase");

async function createInstallation(req, res) {
  try {
    const body = req.body;

    await db.ref("installation").push().set({
      phase: body.phase,
      state: body.state,
      district: body.district,
      assembly: body.assembly,
      ac_no: body.ac_no,
      ps_no: body.ps_no,
      ps_address: body.ps_address,
      is_camera_installed: false,
      is_camera_online: false,
      imageUrl: "null",
      if_pending_remarks: body.if_pending_remarks,
      if_offline_remarks: body.if_offline_remarks,
    });

    res.status(200).send({ status: true });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get specific polling at ./polling/:supervisor_id/:ac_no/:ps_no (GET)
async function specificInstallation(req, res) {
  try {
    const { ac_no, ps_no } = req.params;
    var key;
    await db
      .ref()
      .child("installation")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (
            childSnapshot.val().ac_no == ac_no &&
            childSnapshot.val().ps_no == ps_no
          ) {
            key = childSnapshot.key;
          }
        });
      });

    if (!key) {
      return res.status(400).send({ status: false });
    }

    db.ref()
      .child("installation")
      .child(key)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          res.status(200).send(snapshot.val());
        }
      });
  } catch (err) {
    res.status(400).send({ status: false });
  }
}

// Authenticate at ./installation/:ac_no/:ps_no (GET)
async function authenticateInstallation(req, res) {
  try {
    const { ac_no, ps_no } = req.body;
    var key;
    await db
      .ref()
      .child("installation")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (
            childSnapshot.val().ac_no == ac_no &&
            childSnapshot.val().ps_no == ps_no
          ) {
            key = childSnapshot.key;
          }
        });
      });

    if (!key) {
      return res.status(400).send({ status: false });
    }

    db.ref()
      .child("installation")
      .child(key)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          res.status(200).send({ status: true, body: snapshot.val() });
        }
      });
  } catch (err) {
    res.status(400).send({ status: false });
  }
}

// Update Installation data at ./installation/ (PUT)
async function updateInstallation(req, res) {
  try {
    const { ac_no, ps_no, is_camera_installed, is_camera_online, imageUrl } =
      req.body;
    var key;
    await db
      .ref()
      .child("installation")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          if (
            childSnapshot.val().ac_no == ac_no &&
            childSnapshot.val().ps_no == ps_no
          ) {
            key = childSnapshot.key;
          }
        });
      });

    if (!key) {
      return res.status(400).send({ status: false });
    }

    await db
      .ref()
      .child("installation")
      .child(key)
      .update({
        is_camera_installed: is_camera_installed,
        is_camera_online: is_camera_online,
        imageUrl: imageUrl,
        // imageUrl: `${process.env.url}uploads/${req.file.filename}`,
      })
      .then(() => {
        res.status(200).send({ status: true });
      })
      .catch((error) => {
        return res.send(error);
      });
  } catch (err) {
    res.status(400).send({ status: false });
  }
}

module.exports = {
  createInstallation,
  authenticateInstallation,
  updateInstallation,
  specificInstallation
};
