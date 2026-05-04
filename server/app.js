require("dotenv").config();

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");

// Optional: Prisma (just to ensure connection works)
const prisma = require("./config/prisma");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Routes
app.use("/api/auth", authRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler (basic)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  try {
    // Test DB connection
    await prisma.$connect();
    console.log("✅ Prisma connected to DB");
  } catch (err) {
    console.error("❌ DB connection failed:", err);
  }

  console.log(`🚀 Server running on port ${PORT}`);
});