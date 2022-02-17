const { getDatabase } = require("firebase-admin/database");
const { getStorage } = require("firebase-admin/storage")
const admin = require("firebase-admin");
const serviceAccount = require("../../sst-mis-firebase-adminsdk-662ci-35ef350f9b.json");

// Initialize Firebase
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sst-mis-default-rtdb.firebaseio.com",
  storageBucket: "gs://sst-mis.appspot.com"
});

const db = getDatabase(app);
const bucket = getStorage(app).bucket();

module.exports = { db, bucket, app }

