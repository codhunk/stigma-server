const dotenv = require("dotenv");
const path = require("path");

// Load env vars from root directory
dotenv.config({ path: path.join(__dirname, "../.env") });

const dns = require("dns");
const connectDB = require("./config/database");
const app = require("./app");

// DNS override for MongoDB Atlas SRV records
dns.setServers(["8.8.8.8", "8.8.4.4"]);

// Connect to database
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () =>
  console.log(`🚀 Server running on port ${PORT}`)
);
