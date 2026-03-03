require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Payout-Management-MVP-API",
    date: new Date(),
  });
});

app.use("/api/auth", require("../routes/auth"));
app.use("/api/vendors", require("../routes/vendor"));
app.use("/api/payouts", require("../routes/payout"));

module.exports = app;
