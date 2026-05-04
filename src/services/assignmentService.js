const Assignment = require("../models/Assignment");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

const createAssignment = async (teacherId, assignmentData) => {
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new Error("Teacher not found");

  const assignment = await Assignment.create({
    ...assignmentData,
    teacher: teacherId,
    schoolCode: teacher.schoolCode
  });

  return assignment;
};

const getStudentAssignments = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) throw new Error("Student not found");

  const query = {
    schoolCode: student.schoolCode,
    class: student.class,
  };

  // If section is specified in assignment, filter by it
  // This allows for class-wide or section-specific assignments
  const assignments = await Assignment.find({
    ...query,
    $or: [
      { section: student.section },
      { section: { $exists: false } },
      { section: "" }
    ]
  }).populate("teacher", "name").sort({ dueDate: 1 });

  return assignments;
};

const getTeacherAssignments = async (teacherId) => {
  return await Assignment.find({ teacher: teacherId }).sort({ createdAt: -1 });
};

module.exports = {
  createAssignment,
  getStudentAssignments,
  getTeacherAssignments
};
