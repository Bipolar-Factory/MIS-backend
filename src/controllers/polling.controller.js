const { db } = require("../database/firebase");

async function createPolling(req, res) {
  try {
    const body = req.body;

    await db.ref('polling/'+ body.supervisor_id).set({
      ac_no: body.ac_no,
      ps_no: body.ps_no,
      ac_name: body.ac_name,
      address: body.address,
      district: body.district,
      state: body.state,
      is_mapped: body.is_mapped,
      is_camera_installed: body.is_camera_installed,
      camera_id: body.camera_id,
     	is_camera_online: body.is_camera_online,
      is_survey_completed: body.is_survey_completed,
      is_power_connection_available: body.is_power_connection_available,
      is_power_switch_board_available: body.is_power_switch_board_available,
      remarks: body.remarks,

    });

    res.send("Polling Created")
    
  } catch (err) {
    res.status(400).send(err.message);
  }
}


async function getAllPolling(req, res) {
  try {
    var result;
    await db.ref().child("polling").get().then((snapshot) => {
      if (snapshot.exists()) {
        result = snapshot.val();
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    res.send(result)
    
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { createPolling, getAllPolling }
