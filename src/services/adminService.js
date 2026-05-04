const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

// --- Student Management ---

const getAllStudents = async () => {
  return await Student.find({}).select("-password");
};

const getStudentById = async (id) => {
  const student = await Student.findById(id).select("-password");
  if (!student) throw new Error("Student not found");
  return student;
};

const createStudent = async (studentData) => {
  const existing = await Student.findOne({ emailId: studentData.emailId });
  if (existing) throw new Error("Student already exists with this email");
  return await Student.create(studentData);
};

const updateStudent = async (id, updateData) => {
  const student = await Student.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password");
  if (!student) throw new Error("Student not found");
  return student;
};

const deleteStudent = async (id) => {
  const student = await Student.findByIdAndDelete(id);
  if (!student) throw new Error("Student not found");
  return { message: "Student deleted successfully" };
};

// --- Teacher Management ---

const getAllTeachers = async () => {
  return await Teacher.find({}).select("-password");
};

const getTeacherById = async (id) => {
  const teacher = await Teacher.findById(id).select("-password");
  if (!teacher) throw new Error("Teacher not found");
  return teacher;
};

const createTeacher = async (teacherData) => {
  const existing = await Teacher.findOne({ emailId: teacherData.emailId });
  if (existing) throw new Error("Teacher already exists with this email");
  return await Teacher.create(teacherData);
};

const updateTeacher = async (id, updateData) => {
  const teacher = await Teacher.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select("-password");
  if (!teacher) throw new Error("Teacher not found");
  return teacher;
};

const deleteTeacher = async (id) => {
  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) throw new Error("Teacher not found");
  return { message: "Teacher deleted successfully" };
};

// --- Dashboard Stats ---

const getAdminStats = async () => {
  const studentCount = await Student.countDocuments();
  const teacherCount = await Teacher.countDocuments();
  // Add more stats if needed (e.g. pending fees, attendance averages)
  return {
    totalStudents: studentCount,
    totalTeachers: teacherCount,
  };
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  getAdminStats
};
