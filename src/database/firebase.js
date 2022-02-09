const { getDatabase } = require("firebase-admin/database");
const admin = require("firebase-admin");
const serviceAccount = require("../../sst-mis-firebase-adminsdk-662ci-35ef350f9b.json");

// Initialize Firebase
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sst-mis-default-rtdb.firebaseio.com"
});

const db = getDatabase(app);

module.exports = { db, app }

