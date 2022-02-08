const { getDatabase } = require("firebase-admin/database");
const admin = require("firebase-admin");
const serviceAccount = require("../../sst-mis-firebase-adminsdk-662ci-35ef350f9b.json");

const firebaseConfig = {
  apiKey: "AIzaSyCan9NwzpA3WWly_42SiJMt26psl7bbsSI",
  authDomain: "sst-mis.firebaseapp.com",
  databaseURL: "https://sst-mis-default-rtdb.firebaseio.com",
  projectId: "sst-mis",
  storageBucket: "sst-mis.appspot.com",
  messagingSenderId: "200983913035",
  appId: "1:200983913035:web:b85b7cfd06ca5e35fae3ce",
  measurementId: "G-1DE8LYK2K6"
};

// Initialize Firebase
const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sst-mis-default-rtdb.firebaseio.com"
});

const db = getDatabase(app);

module.exports = { db, app }

