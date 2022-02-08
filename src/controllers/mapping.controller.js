const { db } = require("../database/firebase");

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
        return res.send(error);
      });

  } catch (err) {
    res.status(400).send(err.message);
  }
}

async function updateMapping(req, res) {
  try {
    const { supervisor_id, ac_no, ps_no, camera_id } = req.body;

    await db
      .ref()
      .child("polling")
      .child(supervisor_id)
      .update({ ac_no: ac_no, ps_no: ps_no, camera_id: camera_id })
      .then(() => {
        return res.send({status: "successful"})
      })
      .catch((error) => {
        return res.send(error)
      });

  } catch (err) {
    res.status(400).send(err.message);
  }
}

module.exports = { authenticateId, updateMapping };
