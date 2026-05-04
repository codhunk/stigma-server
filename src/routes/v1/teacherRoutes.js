const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth.middleware");
const { 
  getTeacherDashboard, 
  getSchoolStudents,
  getStudentById,
  submitBatchAttendance,
  getAttendanceByDate,
  markAttendance,
  addMarks,
  createStudent,
  getStudentAttendanceHistory,
  updateStudentResult,
  createAssignment,
  getTeacherAssignments,
  addFeePayment
} = require("../../controllers/teacherController");

// @desc    Get teacher dashboard
// @route   GET /api/teacher/dashboard
// @access  Private
router.get("/dashboard", protect, getTeacherDashboard);

// @desc    Get students in school
// @route   GET /api/teacher/students
// @access  Private
router.get("/students", protect, getSchoolStudents);

// @desc    Create a new student
// @route   POST /api/teacher/students
// @access  Private
router.post("/students", protect, createStudent);

// @desc    Get student details
// @route   GET /api/teacher/students/:id
// @access  Private
router.get("/students/:id", protect, getStudentById);

router.get("/students/:id/attendance", protect, getStudentAttendanceHistory);

// @desc    Update a specific student result
// @route   PUT /api/teacher/students/:id/results/:resultId
// @access  Private
router.put("/students/:id/results/:resultId", protect, updateStudentResult);

// @desc    Submit batch attendance
// @route   POST /api/teacher/batch-attendance
// @access  Private
router.post("/batch-attendance", protect, submitBatchAttendance);

// @desc    Get attendance records for a specific date
// @route   GET /api/teacher/attendance
// @access  Private
router.get("/attendance", protect, getAttendanceByDate);

// @desc    Mark student attendance
// @route   POST /api/teacher/attendance
// @access  Private
router.post("/attendance", protect, markAttendance);

// @desc    Add student marks
// @route   POST /api/teacher/marks
// @access  Private
router.post("/marks", protect, addMarks);

// Assignments
router.post("/assignments", protect, createAssignment);
router.get("/assignments", protect, getTeacherAssignments);

// Fees
router.post("/students/:id/fees", protect, addFeePayment);

module.exports = router;
