const authService = require("../services/authService");
const generateToken = require("../utils/generateToken");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      emailId: user.emailId,
      role: req.body.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    res.json({
      _id: user._id,
      name: user.name,
      emailId: user.emailId,
      role: req.body.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
// @desc    Reset password
// @route   POST /api/auth/forgot-password
// @access  Public
exports.forgotPassword = async (req, res) => {
  try {
    await authService.forgotPassword(req.body);
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
