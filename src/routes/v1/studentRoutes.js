const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth.middleware");
const { 
  getDashboard, 
  getFees, 
  getSchedule, 
  getResults, 
  getStudentProfile,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  getAssignments
} = require("../../controllers/studentController");

// --- Student Self Service Routes ---

// @desc    Get student dashboard
// @route   GET /api/student/dashboard
// @access  Private
router.get("/dashboard", protect, getDashboard);

// @desc    Get fees details
// @route   GET /api/student/fees
// @access  Private
router.get("/fees", protect, getFees);

// @desc    Get today's schedule
// @route   GET /api/student/schedule
// @access  Private
router.get("/schedule", protect, getSchedule);

// @desc    Get results
// @route   GET /api/student/results
// @access  Private
router.get("/results", protect, getResults);

// @desc    Get assignments
// @route   GET /api/student/assignments
// @access  Private
router.get("/assignments", protect, getAssignments);

// @desc    Get student profile
// @route   GET /api/student/profile/:sid
// @access  Private
router.get("/profile/:sid", protect, getStudentProfile);

// --- Student Management Routes (Admin/Staff) ---

// @desc    Get all students
// @route   GET /api/student
// @access  Private
router.get("/", protect, getAllStudents);

// @desc    Create a student
// @route   POST /api/student
// @access  Private
router.post("/", protect, createStudent);

// @desc    Update a student
// @route   PUT /api/student/:id
// @access  Private
router.put("/:id", protect, updateStudent);

// @desc    Delete a student
// @route   DELETE /api/student/:id
// @access  Private
router.delete("/:id", protect, deleteStudent);

module.exports = router;
