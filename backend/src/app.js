const express = require("express");
const cors = require("cors");
const authRoutes = require("./interfaces/routes/authRoutes");
const taskRoutes = require("./interfaces/routes/taskRoutes");
const errorHandler = require("./interfaces/middlewares/errorHandler");

const app = express();

// ── Global Middlewares ────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Health Check ─────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "TaskFlow API is running" });
});

// ── Routes ────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// ── 404 ───────────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res
    .status(404)
    .json({
      success: false,
      message: `Route ${req.method} ${req.path} not found`,
    });
});

// ── Centralized Error Handler (must be last) ──────────────────────────────────
app.use(errorHandler);

module.exports = app;
