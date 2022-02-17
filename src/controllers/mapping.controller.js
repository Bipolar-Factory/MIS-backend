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
            return res.send({status: true});
        } else {
            return res.send({status: false});
        }
      })
      .catch((error) => {
        return res.send({status: false});
      });

  } catch (err) {
    res.status(400).send({status: false});
  }
}

// Update data at ./mapping (PUT)
async function updateMapping(req, res) {
  try {
    const { supervisor_id, ac_no, ps_no, camera_id } = req.body;

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

    if (!key){
      return res.status(400).send({status: false})
    }

    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
      .child(key)
      .update({ camera_id: camera_id, is_mapped: true })
      .then(() => {
        return res.send({status: true})
      })
      .catch((error) => {
        return res.send({status: false})
      });

  } catch (err) {
    res.status(400).send({status: false});
  }
}

// Delete data at ./mapping (DELETE)
async function deleteMapping(req, res) {
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

      if (!key){
        return res.status(400).send({status: false})
      }
  
      await db
      .ref()
      .child("polling")
      .child(supervisor_id)
      .child(key)
      .update({
        camera_id: "null",
        is_mapped: false,
      })
      .then(() => {
        res.status(200).send({ status: true });
      })
      .catch((error) => {
        return res.send({status: false});
      });
  
    } catch (err) {
      res.status(400).send({status: false});
    }
  }

module.exports = { authenticateId, updateMapping, deleteMapping };
