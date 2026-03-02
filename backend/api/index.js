const express = require("express");
const cors = require("cors");
const connectDB = require("../config/db");

const app = express();

let isConnected = false;

async function ensureDB() {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
}

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("../routes/auth"));
app.use("/api/vendors", require("../routes/vendor"));
app.use("/api/payouts", require("../routes/payout"));

module.exports = async (req, res) => {
  await ensureDB();
  return app(req, res);
};