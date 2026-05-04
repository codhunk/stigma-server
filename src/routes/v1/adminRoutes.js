const express = require("express");
const router = express.Router();
const { protect } = require("../../middlewares/auth.middleware");
const {
  getStats,
  getStudents,
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getTeachers,
  getTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher
} = require("../../controllers/adminController");

// Dashboard
router.get("/stats", protect, getStats);

// Student Management
router.get("/students", protect, getStudents);
router.get("/students/:id", protect, getStudent);
router.post("/students", protect, createStudent);
router.put("/students/:id", protect, updateStudent);
router.delete("/students/:id", protect, deleteStudent);

// Teacher Management
router.get("/teachers", protect, getTeachers);
router.get("/teachers/:id", protect, getTeacher);
router.post("/teachers", protect, createTeacher);
router.put("/teachers/:id", protect, updateTeacher);
router.delete("/teachers/:id", protect, deleteTeacher);

module.exports = router;
