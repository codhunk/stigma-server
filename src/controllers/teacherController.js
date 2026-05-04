const teacherService = require("../services/teacherService");

// @desc    Get teacher dashboard data
// @route   GET /api/teacher/dashboard
// @access  Private
exports.getTeacherDashboard = async (req, res) => {
  try {
    const data = await teacherService.getTeacherDashboard(req.user._id, req.query);
    res.status(200).json(data);
  } catch (error) {
    res.status(error.message === "Teacher not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Get students in the same school (with filters)
// @route   GET /api/teacher/students
// @access  Private
exports.getSchoolStudents = async (req, res) => {
  try {
    const students = await teacherService.getSchoolStudents(req.user._id, req.query);
    res.status(200).json(students);
  } catch (error) {
    res.status(error.message === "Teacher not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Get a single student details
// @route   GET /api/teacher/students/:id
// @access  Private
exports.getStudentById = async (req, res) => {
  try {
    const student = await teacherService.getStudentById(req.user._id, req.params.id);
    res.status(200).json(student);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Submit batch attendance
// @route   POST /api/teacher/batch-attendance
// @access  Private
exports.submitBatchAttendance = async (req, res) => {
  try {
    const attendance = await teacherService.submitBatchAttendance(req.user._id, req.body);
    res.status(200).json({ message: "Attendance submitted successfully", data: attendance });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get attendance by date
// @route   GET /api/teacher/attendance
// @access  Private
exports.getAttendanceByDate = async (req, res) => {
  try {
    const attendance = await teacherService.getAttendanceByDate(req.user._id, req.query);
    res.status(200).json(attendance);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Mark attendance for a single student (legacy/manual)
// @route   POST /api/teacher/attendance
// @access  Private
exports.markAttendance = async (req, res) => {
  const { studentId, attendance } = req.body;
  try {
    const student = await teacherService.updateAttendance(req.user._id, studentId, attendance);
    res.status(200).json({ message: "Attendance updated successfully", attendance: student.attendance });
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 400).json({ message: error.message });
  }
};

// @desc    Add marks for multiple students (batch)
// @route   POST /api/teacher/marks
// @access  Private
exports.addMarks = async (req, res) => {
  try {
    const results = await teacherService.submitBatchMarks(req.user._id, req.body);
    res.status(200).json({ message: "Marks added successfully", data: results });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Create a new student
// @route   POST /api/teacher/students
// @access  Private
exports.createStudent = async (req, res) => {
  try {
    const student = await teacherService.createStudent(req.user._id, req.body);
    res.status(201).json({ message: "Student created successfully", data: student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get attendance history for a single student
// @route   GET /api/teacher/students/:id/attendance
// @access  Private
exports.getStudentAttendanceHistory = async (req, res) => {
  try {
    const history = await teacherService.getStudentAttendanceHistory(req.user._id, req.params.id);
    res.status(200).json(history);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a specific student result
// @route   PUT /api/teacher/students/:id/results/:resultId
// @access  Private
exports.updateStudentResult = async (req, res) => {
  try {
    const result = await teacherService.updateStudentResult(req.params.id, req.params.resultId, req.body);
    if (!result) return res.status(404).json({ message: "Student or Result not found" });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const assignmentService = require("../services/assignmentService");

// @desc    Create a new assignment
// @route   POST /api/teacher/assignments
// @access  Private
exports.createAssignment = async (req, res) => {
  try {
    const assignment = await assignmentService.createAssignment(req.user._id, req.body);
    res.status(201).json({ message: "Assignment created successfully", data: assignment });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get assignments created by teacher
// @route   GET /api/teacher/assignments
// @access  Private
exports.getTeacherAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getTeacherAssignments(req.user._id);
    res.status(200).json(assignments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add fee payment record for a student
// @route   POST /api/teacher/students/:id/fees
// @access  Private
exports.addFeePayment = async (req, res) => {
  try {
    const fees = await teacherService.addFeePayment(req.user._id, req.params.id, req.body);
    res.status(200).json({ message: "Fee record added successfully", data: fees });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
