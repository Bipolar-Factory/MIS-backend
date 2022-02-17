const { db } = require("../database/firebase");

// Authenticate at ./installation/:ac_no/:ps_no (GET)
async function authenticateInstallation(req, res) {
  try {
    const { ac_no, ps_no } = req.body;
    var supervisor_id, key;
    await db
      .ref()
      .child("polling")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((grandChildSnapshot) => {
            if (
              grandChildSnapshot.val().ac_no == ac_no &&
              grandChildSnapshot.val().ps_no == ps_no
            ) {
              supervisor_id = childSnapshot.key;
              key = grandChildSnapshot.key;
            }
          });
        });
      });

      db.ref().child("polling").child(supervisor_id).child(key).get().then((snapshot) => {
        if (snapshot.exists()) {
          res.status(200).send({status: "accepted", body: snapshot.val()});
        }})

    
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Update Installation data at ./installation/ (PUT)
async function updateInstallation(req, res) {
  try {
    const { ac_no, ps_no, is_camera_installed, is_camera_online } = req.body;
    var supervisor_id, key;

    await db
      .ref()
      .child("polling")
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          childSnapshot.forEach((grandChildSnapshot) => {
            if (
              grandChildSnapshot.val().ac_no == ac_no &&
              grandChildSnapshot.val().ps_no == ps_no
            ) {
              supervisor_id = childSnapshot.key;
              key = grandChildSnapshot.key;
            }
          });
        });
      });


    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
      .child(key)
      .update({
        is_camera_installed: is_camera_installed,
        is_camera_online: is_camera_online,
        imageUrl: `${process.env.url}uploads/${req.file.filename}`,
      })
      .then(() => {
        res.status(200).send({ status: true });
      })
      .catch((error) => {
        return res.send(error);
      });

  } catch (err) {
    res.status(400).send(err.message);
  }
}


// Update Installation data at ./installation/ (PUT)
async function postTest(req, res) {
  try {

    await db
      .ref()
      .child("test")
      .update({
        imageUrl: `${process.env.url}uploads/${req.file.filename}`,
      })
      .then(() => {
        res.status(200).send({ status: true });
      })
      .catch((error) => {
        return res.send(error);
      });

  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { authenticateInstallation, updateInstallation, postTest };
