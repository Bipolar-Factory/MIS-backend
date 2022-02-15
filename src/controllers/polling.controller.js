const { db } = require("../database/firebase");
const multer = require("multer");

// Create a Polling at ./polling (POST)
async function createPolling(req, res) {
  try {
    const body = req.body;

    await db.ref('polling/'+ body.supervisor_id).push().set({
      supervisor_id: body.supervisor_id,
      supervisor_name: body.supervisor_name,
      ac_no: body.ac_no,
      ps_no: body.ps_no,
      ac_name: body.ac_name,
      address: body.address,
      district: body.district,
      state: body.state,
      is_mapped: false,
      is_survey_completed: false,
    });

    res.status(200).send("Polling Created")
    
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get Polling under a supervisor using ./polling/:supervisor_id (GET)
async function getSupervisorPolling(req, res) {
  try {
    const supervisor_id = req.params.supervisor_id;
    var list = []
    await db.ref().child("polling").child(supervisor_id).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        list.push(childSnapshot.val());
      });
    })

    if(list.length != 0){
      res.status(200).send(list);
    }else{
      res.status(404).end("Not found")
    }
    
    
  } catch (err) {
    res.status(400).send(err.message);
  }
}

// Get specific polling at ./polling/:supervisor_id/:ac_no/:ps_no (GET)
async function specificPolling(req, res) {
  try {
    const supervisor_id = req.params.supervisor_id;
    const ac_no = req.params.ac_no;
    const ps_no = req.params.ps_no;

    await db.ref().child("polling").child(supervisor_id).once('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.val().ac_no == ac_no && childSnapshot.val().ps_no == ps_no){
          return res.status(200).send(childSnapshot);
        }
      });
    })
    res.status(404).end("Not found")
    
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { createPolling, getSupervisorPolling, specificPolling }
