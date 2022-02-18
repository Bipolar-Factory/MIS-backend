const { db } = require("../database/firebase");

async function createSurvey(req, res) {
  try {
    const body = req.body;

    await db.ref('survey/'+ body.supervisor_id).push().set({

      phase: body.phase, 
      state: body.state, 
      district: body.district, 
      assembly: body.assembly, 
      ac_no: body.ac_no, 
      ps_no: body.ps_no, 
      ps_address: body.ps_address, 
      supervisor_id: body.supervisor_id, 
      operator: "null", 
      rssi: "null", 
      upload_speed: "null", 
      download_speed: "null",
      is_survey_completed: false, 
      power_connection_avalaible: false, 
      power_socket_avaliable: false, 
      booth_safety: "null", 
      remarks: "null"

    });
    
    res.status(200).send({status: true})
    
  } catch (err) {
    res.status(400).send(err.message);
  }
}


// Authenticate supervisior at ./mapping (POST)
async function authenticateId(req, res) {
  try {
    const { supervisor_id } = req.body;

    await db
      .ref()
      .child("survey")
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
      power_connection_avalaible, 
      power_socket_avaliable, 
      booth_safety, 
      remarks,
      operator, 
      rssi, 
      upload_speed, 
      download_speed,
    } = req.body;
    var key;

    await db
      .ref()
      .child("survey")
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

      if (!key){
        return res.status(400).send({status: false})
      }

    await db
      .ref()
      .child("survey")
      .child(supervisor_id)
      .child(key)
      .update({
        is_survey_completed: true,
        power_connection_avalaible: power_connection_avalaible, 
        power_socket_avaliable: power_socket_avaliable, 
        booth_safety: booth_safety, 
        remarks: remarks,
        operator: operator, 
        rssi: rssi, 
        upload_speed: upload_speed, 
        download_speed: download_speed,
      })
      .then(() => {
        res.status(200).send({ status: true });
      })
      .catch((error) => {
        return res.send(error);
      });
  } catch (err) {
    res.status(400).send({status: false})
  }
}

// Delete data at ./survey (DELETE)
async function deleteSurvey(req, res) {
  try {
    const { supervisor_id, ac_no, ps_no } = req.body;
    var key;

    await db
      .ref()
      .child("survey")
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

      if (!key){
        return res.status(400).send({status: false})
      }

    await db
      .ref()
      .child("survey")
      .child(supervisor_id)
      .child(key)
      .update({
        is_survey_completed: false,
        power_connection_avalaible: false, 
        power_socket_avaliable: false, 
        booth_safety: "null", 
        remarks: "null",
        operator: "null", 
        rssi: "null", 
        upload_speed: "null", 
        download_speed: "null",
      })
      .then(() => {
        res.status(200).send({ status: true });
      })
      .catch((error) => {
        return res.send(error);
      });
  } catch (err) {
    res.status(400).send({status: false})
  }
}

module.exports = { authenticateId, deleteSurvey, updateSurvey, createSurvey };
