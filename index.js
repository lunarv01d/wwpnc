const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary in-memory storage
let notifications = [];

// POST /api/notify
app.post("/api/notify", (req, res) => {
  const body = req.body || {};

  const notification = {
    id: Date.now(),
    source: body.source || "unknown",
    title: body.title || "No title",
    message: body.message || "",
    timestamp: new Date().toISOString()
  };

  notifications.push(notification);

  console.log("New notification:", notification);

  res.json({ success: true, notification });
});

// GET /api/notifications
app.get("/api/notifications", (req, res) => {
  res.json(notifications);
});

// Start server
app.listen(PORT, () => {
  console.log(`WWPNC backend running on http://localhost:${PORT}`);
});