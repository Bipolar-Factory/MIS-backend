const express = require("express");
const dotenv = require("dotenv").config();
const Router = require("./routers");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", Router);

let port = process.env.PORT || 5000;

app.listen(port, function () {
  console.log("Server is up and running at port:", port);
});