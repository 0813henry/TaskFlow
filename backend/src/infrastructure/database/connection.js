const mongoose = require("mongoose");

/**
 * Establishes the MongoDB connection using the MONGO_URI env variable.
 * Exits the process on failure — a broken DB connection is unrecoverable at startup.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
