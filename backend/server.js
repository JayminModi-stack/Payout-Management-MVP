require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // adjust path if needed

const app = express();

// Connect DB (important for serverless)
let isConnected = false;

const connectDatabase = async () => {
  if (isConnected) return;

  await connectDB();
  isConnected = true;
};

// Middlewares
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/vendors", require("./routes/vendor"));
app.use("/api/payouts", require("./routes/payout"));

// 🔥 IMPORTANT: Export instead of listen
module.exports = async (req, res) => {
  await connectDatabase();
  return app(req, res);
};