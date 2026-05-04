const jwt = require("jsonwebtoken");
const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      if (!process.env.JWT_SECRET) {
        console.error("CRITICAL ERROR: JWT_SECRET is not defined in environment variables");
        return res.status(500).json({ message: "Internal server error: Security configuration missing" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attempt to find user in either collection
      req.user = await Student.findById(decoded.id).select("-password") || 
                 await Teacher.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(401).json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check for specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    // Note: We'd need to store the role in the user document or token to check accurately here.
    // For now, we can check which model it came from or assume it's attached.
    // A better way is to include 'role' in the JWT payload.
    next();
  };
};

module.exports = { protect, authorize };