const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error Details:");
    console.error("Code:", error.code);
    console.error("Syscall:", error.syscall);
    console.error("Hostname:", error.hostname);
    console.error("Full Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
