const studentService = require("../services/studentService");

// @desc    Get student dashboard data
// @route   GET /api/student/dashboard
// @access  Private
exports.getDashboard = async (req, res) => {
  try {
    const student = await studentService.getStudentDashboard(req.user._id);
    res.status(200).json({
      name: student.name,
      schoolName: student.schoolName,
      emailId: student.emailId,
      attendance: student.attendance,
      upcomingClasses: student.upcomingClasses,
      totalStudents: student.totalSchoolStudents,
      fees: {
        amountDue: student.feeStatus.amountDue,
      },
      results: student.results || []
    });
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Get detailed fee status
// @route   GET /api/student/fees
// @access  Private
exports.getFees = async (req, res) => {
  try {
    const fees = await studentService.getStudentFees(req.user._id);
    res.status(200).json(fees);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Get today's schedule
// @route   GET /api/student/schedule
// @access  Private
exports.getSchedule = async (req, res) => {
  try {
    const schedule = await studentService.getStudentSchedule(req.user._id);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Get detailed results
// @route   GET /api/student/results
// @access  Private
exports.getResults = async (req, res) => {
  try {
    const results = await studentService.getStudentResults(req.user._id);
    res.status(200).json(results);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Get student profile (legacy)
// @route   GET /api/student/get-student/:sid
// @access  Private
exports.getStudentProfile = async (req, res) => {
  const { sid } = req.params;
  try {
    const student = await studentService.getStudentProfile(sid);
    res.status(200).json(student);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};

// @desc    Get all students
// @route   GET /api/student
// @access  Private/Admin (for now just Private)
exports.getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a student
// @route   POST /api/student
// @access  Private/Admin
exports.createStudent = async (req, res) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a student
// @route   PUT /api/student/:id
// @access  Private/Admin
exports.updateStudent = async (req, res) => {
  try {
    const updatedStudent = await studentService.updateStudent(req.params.id, req.body);
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 400).json({ message: error.message });
  }
};

// @desc    Delete a student
// @route   DELETE /api/student/:id
// @access  Private/Admin
exports.deleteStudent = async (req, res) => {
  try {
    const result = await studentService.deleteStudent(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};
const assignmentService = require("../services/assignmentService");

// @desc    Get assignments for the student
// @route   GET /api/student/assignments
// @access  Private
exports.getAssignments = async (req, res) => {
  try {
    const assignments = await assignmentService.getStudentAssignments(req.user._id);
    res.status(200).json(assignments);
  } catch (error) {
    res.status(error.message === "Student not found" ? 404 : 500).json({ message: error.message });
  }
};
