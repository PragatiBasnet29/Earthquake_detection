const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// ─── Database Configuration ──────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/earthquake_db";

mongoose.connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// ─── Data Schema ─────────────────────────────────────────────────────────────
const ReadingSchema = new mongoose.Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
  z: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Reading = mongoose.model("Reading", ReadingSchema);

// ─── In-Memory Current State (for high-frequency polling) ────────────────────
let currentData = { x: 0.0, y: 0.0, z: 9.81 };
let quakeMode = false;
let quakeTimer = 0;

function gaussianRandom(mean, std) {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

// ─── Data Engine ─────────────────────────────────────────────────────────────
async function updateAndSaveData() {
  // Simulate logic (kept from original)
  if (!quakeMode && Math.random() < 0.005) {
    quakeMode = true;
    quakeTimer = Math.floor(Math.random() * 20) + 10;
    console.log("🔴 Simulated earthquake event started!");
  }

  if (quakeMode) {
    const intensity = gaussianRandom(4.5, 1.5);
    currentData = {
      x: parseFloat(gaussianRandom(0, intensity).toFixed(4)),
      y: parseFloat(gaussianRandom(0, intensity).toFixed(4)),
      z: parseFloat(gaussianRandom(9.81, intensity * 0.5).toFixed(4)),
    };
    quakeTimer--;
    if (quakeTimer <= 0) {
      quakeMode = false;
      console.log("✅ Earthquake event ended.");
    }
  } else {
    currentData = {
      x: parseFloat(gaussianRandom(0, 0.15).toFixed(4)),
      y: parseFloat(gaussianRandom(0, 0.15).toFixed(4)),
      z: parseFloat(gaussianRandom(9.81, 0.08).toFixed(4)),
    };
  }

  // Persist to MongoDB every 500ms (or on demand)
  try {
    const newReading = new Reading({ ...currentData });
    await newReading.save();
    
    // Optional: Keep DB size small by pruning old records (keep last 1000)
    // In a production app, you might do this via a cron job instead.
  } catch (err) {
    console.error("Failed to persist reading:", err.message);
  }
}

// Update readings every 500 ms
setInterval(updateAndSaveData, 500);

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET  /        → return latest sensor reading (highly frequent)
app.get("/", (req, res) => {
  res.json(currentData);
});

// POST /        → allow external sensor to push real data
app.post("/", async (req, res) => {
  try {
    const incoming = req.body;
    if (typeof incoming.x !== "number" || typeof incoming.y !== "number" || typeof incoming.z !== "number") {
      return res.status(400).json({ error: "Body must contain numeric x, y, z fields." });
    }
    currentData = {
      x: parseFloat(incoming.x.toFixed(4)),
      y: parseFloat(incoming.y.toFixed(4)),
      z: parseFloat(incoming.z.toFixed(4)),
    };
    
    // Persist pushed reading
    const newReading = new Reading({ ...currentData });
    await newReading.save();
    
    res.json(currentData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET  /history → return last 60 readings from MongoDB
app.get("/history", async (req, res) => {
  try {
    const readings = await Reading.find()
      .sort({ timestamp: -1 })
      .limit(60);
    // Return in chronological order for the chart
    res.json(readings.reverse());
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// GET  /status  → health check
app.get("/status", (req, res) => {
  res.json({ 
    status: "ok", 
    mode: quakeMode ? "earthquake" : "normal", 
    db: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  });
});

// ─── Contact Form Email Logic (kept identical) ──────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Please provide name, email, and message." });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECEIVER_EMAIL,
    replyTo: email,
    subject: `New Message from ${name} (Earthquake Alert System)`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📩 Email sent from ${name} <${email}>`);
    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ error: "Failed to send message." });
  }
});

// ─── Start server on port 8000 ──────────────────────────────────────────────
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🌍 Earthquake Alert Backend running at http://localhost:${PORT}`);
  console.log(`💾 Connected to MongoDB architecture`);
});
