const adminService = require("../services/adminService");

// @desc    Get dashboard stats
// @route   GET /api/v1/admin/stats
// @access  Private/Admin
exports.getStats = async (req, res) => {
  try {
    const stats = await adminService.getAdminStats();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// --- Student Handlers ---

exports.getStudents = async (req, res) => {
  try {
    const students = await adminService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStudent = async (req, res) => {
  try {
    const student = await adminService.getStudentById(req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

exports.createStudent = async (req, res) => {
  try {
    const student = await adminService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateStudent = async (req, res) => {
  try {
    const student = await adminService.updateStudent(req.params.id, req.body);
    res.status(200).json(student);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 400).json({ message: error.message });
  }
};

exports.deleteStudent = async (req, res) => {
  try {
    const result = await adminService.deleteStudent(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

// --- Teacher Handlers ---

exports.getTeachers = async (req, res) => {
  try {
    const teachers = await adminService.getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTeacher = async (req, res) => {
  try {
    const teacher = await adminService.getTeacherById(req.params.id);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(error.message === "Teacher not found" ? 404 : 500).json({ message: error.message });
  }
};

exports.createTeacher = async (req, res) => {
  try {
    const teacher = await adminService.createTeacher(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTeacher = async (req, res) => {
  try {
    const teacher = await adminService.updateTeacher(req.params.id, req.body);
    res.status(200).json(teacher);
  } catch (error) {
    res.status(error.message === "Teacher not found" ? 404 : 400).json({ message: error.message });
  }
};

exports.deleteTeacher = async (req, res) => {
  try {
    const result = await adminService.deleteTeacher(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.message === "Teacher not found" ? 404 : 500).json({ message: error.message });
  }
};
