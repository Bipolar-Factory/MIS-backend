const { db } = require("../database/firebase");

// Authenticate supervisior at ./mapping (POST)
async function authenticateId(req, res) {
  try {
    const { supervisor_id } = req.body;

    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          return res.send({ status: true });
        } else {
          return res.send({ status: false });
        }
      })
      .catch((error) => {
        return res.send(error);
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Update data at ./survey (PUT)
async function updateSurvey(req, res) {
  try {
    const {
      supervisor_id,
      ac_no,
      ps_no,
      remarks,
      is_power_switch_board_available,
      is_power_connection_available,
    } = req.body;
    var key;

    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
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

    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
      .child(key)
      .update({
        is_survey_completed: true,
        remarks: remarks,
        is_power_switch_board_available: is_power_switch_board_available,
        is_power_connection_available: is_power_connection_available,
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

// Delete data at ./survey (DELETE)
async function deleteSurvey(req, res) {
  try {
    const { supervisor_id, ac_no, ps_no } = req.body;
    var key;

    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
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

    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
      .child(key)
      .update({
        is_survey_completed: false,
        remarks: null,
        is_power_switch_board_available: null,
        is_power_connection_available: null,
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

module.exports = { authenticateId, deleteSurvey, updateSurvey };
