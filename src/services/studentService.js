const Student = require("../models/Student");

const getStudentDashboard = async (studentId) => {
  const student = await Student.findById(studentId).select("name schoolName emailId attendance upcomingClasses feeStatus results studentId mobileNumber schoolCode address");
  if (!student) throw new Error("Student not found");
  
  const totalStudents = await Student.countDocuments({ schoolCode: student.schoolCode });
  
  const studentData = student.toObject();
  studentData.totalSchoolStudents = totalStudents;
  
  return studentData;
};

const getStudentFees = async (studentId) => {
  const student = await Student.findById(studentId).select("feeStatus");
  if (!student) throw new Error("Student not found");
  return student.feeStatus;
};

const getStudentSchedule = async (studentId) => {
  const student = await Student.findById(studentId).select("schedule");
  if (!student) throw new Error("Student not found");
  return student.schedule;
};

const getStudentResults = async (studentId) => {
  const student = await Student.findById(studentId).select("results");
  if (!student) throw new Error("Student not found");
  return student.results;
};

const getStudentProfile = async (studentId) => {
  const student = await Student.findById(studentId).select("-password");
  if (!student) throw new Error("Student not found");
  return student;
};

const getAllStudents = async () => {
  return await Student.find({}).select("-password");
};

const createStudent = async (studentData) => {
  const studentExists = await Student.findOne({ emailId: studentData.emailId });
  if (studentExists) throw new Error("Student already exists with this email");

  const student = await Student.create(studentData);
  return student;
};

const updateStudent = async (studentId, updateData) => {
  const student = await Student.findById(studentId);
  if (!student) throw new Error("Student not found");

  // Update fields
  Object.keys(updateData).forEach((key) => {
    student[key] = updateData[key];
  });

  const updatedStudent = await student.save();
  return updatedStudent;
};

const deleteStudent = async (studentId) => {
  const student = await Student.findById(studentId);
  if (!student) throw new Error("Student not found");
  await student.deleteOne();
  return { message: "Student removed" };
};

module.exports = {
  getStudentDashboard,
  getStudentFees,
  getStudentSchedule,
  getStudentResults,
  getStudentProfile,
  getAllStudents,
  createStudent,
  updateStudent,
  deleteStudent
};
