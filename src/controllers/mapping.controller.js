const { db } = require("../database/firebase");

async function authenticateId(req, res) {
  try {
    const { supervisor_id } = req.body;
    var status;

    await db.ref().child("polling").child(supervisor_id).get().then((snapshot) => {
      if (snapshot.exists()) {
        status = true;
      } else {
        status = false;
      }
    }).catch((error) => {
      console.error(error);
    });

    res.send(status)
    
  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { authenticateId }
