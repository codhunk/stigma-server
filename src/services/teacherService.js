const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Attendance = require("../models/Attendance");
const mongoose = require("mongoose");

const findStudentByIdOrCustomId = async (id) => {
  const query = mongoose.Types.ObjectId.isValid(id)
    ? { _id: id }
    : { studentId: id };
  return await Student.findOne(query);
};

const getTeacherDashboard = async (teacherId, filters = {}) => {
  const teacher = await Teacher.findById(teacherId).select("-password");
  if (!teacher) throw new Error("Teacher not found");

  // Removed strict schoolCode filter to give all student access as requested
  const query = {};
  const students = await Student.find(query).select("attendance class section");
  const totalStudents = students.length;

  // Stats for selected or assigned class
  const selectedClass = filters.class || teacher.assignedClass;
  const selectedSection = filters.section || teacher.assignedSection;

  const classStudents = students.filter(s => {
    const classMatch = !selectedClass || s.class === selectedClass;
    const sectionMatch = !selectedSection || s.section === selectedSection;
    return classMatch && sectionMatch;
  });
  const classStudentCount = classStudents.length;

  let totalAttendanceSum = 0;
  let totalPendingFees = 0;

  students.forEach(s => {
    if (s.attendance) {
      totalAttendanceSum += parseInt(s.attendance.replace('%', '')) || 0;
    }
  });

  const allStudentsForFees = await Student.find(query).select("feeStatus");
  allStudentsForFees.forEach(s => {
    if (s.feeStatus && s.feeStatus.totalPending) {
      totalPendingFees += s.feeStatus.totalPending;
    }
  });

  const avgAttendance = totalStudents > 0 ? (totalAttendanceSum / totalStudents).toFixed(0) + "%" : "0%";

  return {
    teacher: {
      ...teacher.toObject(),
      assignedClass: teacher.assignedClass,
      assignedSection: teacher.assignedSection,
    },
    stats: {
      totalStudents,
      classStudentCount,
      avgAttendance,
      totalPendingFees
    },
    avgAttendance
  }
};


const getSchoolStudents = async (teacherId, filters = {}) => {
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new Error("Teacher not found");

  // Removed strict schoolCode filter to give all student access
  const query = {};

  const className = filters.class;
  const section = filters.section;
  const search = filters.search;

  if (className && className !== "Class") query.class = className;
  if (section && section !== "Section") query.section = section;
  if (search) {
    query.name = { $regex: search, $options: "i" };
  }

  return await Student.find(query).sort({ rollNo: 1 });
};

const getStudentById = async (teacherId, id) => {
  const student = await findStudentByIdOrCustomId(id);

  if (!student) throw new Error("Student not found");
  return student;
};

const submitBatchAttendance = async (teacherId, attendanceData) => {
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new Error("Teacher not found");

  const { date, class: className, section, records } = attendanceData;
  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0); // Normalize to start of day UTC

  const results = [];
  for (const record of records) {
    // 1. Update or create daily attendance record
    const attendance = await Attendance.findOneAndUpdate(
      { student: record.studentId, date: attendanceDate },
      {
        teacher: teacherId,
        status: record.status,
        class: className,
        section: section,
      },
      { upsert: true, new: true }
    );
    results.push(attendance);

    // 2. Recalculate total attendance percentage for the student
    const totalDays = await Attendance.countDocuments({ student: record.studentId });
    const presentDays = await Attendance.countDocuments({ student: record.studentId, status: "Present" });

    const percentage = totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(0) + "%" : "0%";

    await Student.findByIdAndUpdate(record.studentId, { attendance: percentage });
  }

  return results;
};

const getAttendanceByDate = async (teacherId, queryData) => {
  const { date, class: className, section } = queryData;
  const attendanceDate = new Date(date);
  attendanceDate.setUTCHours(0, 0, 0, 0);

  const query = { date: attendanceDate };
  if (className) query.class = className;
  if (section) query.section = section;

  return await Attendance.find(query).select("student status");
};

const updateAttendance = async (teacherId, id, attendance) => {
  const student = await findStudentByIdOrCustomId(id);

  if (!student) throw new Error("Student not found");

  student.attendance = attendance;
  await student.save();
  return student;
};

const updateResults = async (teacherId, id, resultData) => {
  const student = await findStudentByIdOrCustomId(id);

  if (!student) throw new Error("Student not found");

  if (!student.results) student.results = [];
  student.results.push(resultData);

  await student.save();
  return student;
};

const submitBatchMarks = async (teacherId, marksData) => {
  const { subject, class: className, section, examType, marks } = marksData;

  const results = [];
  for (const record of marks) {
    const student = await Student.findById(record.studentId);
    if (student) {
      const resultEntry = {
        semester: "1st Semester", // Default or could be passed from frontend
        examType: examType || "Sessional",
        subjects: [
          { name: subject, marks: parseInt(record.score) || 0, totalMarks: 100 }
        ]
      };

      if (!student.results) student.results = [];
      student.results.push(resultEntry);
      await student.save();
      results.push(student);
    }
  }
  return results;
};

const createStudent = async (teacherId, studentData) => {
  const teacher = await Teacher.findById(teacherId);
  if (!teacher) throw new Error("Teacher not found");

  // Automatically use teacher's schoolCode and schoolName
  const newStudentData = {
    ...studentData,
    schoolCode: teacher.schoolCode,
    schoolName: teacher.schoolName,
    password: studentData.password || "student123", // Default password
  };

  const student = new Student(newStudentData);
  await student.save();
  return student;
};

const getStudentAttendanceHistory = async (teacherId, id) => {
  const student = await findStudentByIdOrCustomId(id);
  if (!student) throw new Error("Student not found");

  return await Attendance.find({ student: student._id })
    .sort({ date: -1 })
    .select("date status");
};

const updateStudentResult = async (id, resultId, updatedData) => {
  const student = await findStudentByIdOrCustomId(id);
  if (!student) return null;

  const result = student.results.id(resultId);
  if (!result) return null;

  if (updatedData.subjects) result.subjects = updatedData.subjects;
  if (updatedData.examType) result.examType = updatedData.examType;
  if (updatedData.semester) result.semester = updatedData.semester;

  result.lastUpdated = new Date();
  await student.save();
  return result;
};

const addFeePayment = async (teacherId, id, feeData) => {
  const student = await findStudentByIdOrCustomId(id);

  if (!student) throw new Error("Student not found");

  const { amount, month, type, status } = feeData;

  if (!student.feeStatus) {
    student.feeStatus = { amountDue: 0, totalPending: 0, history: [] };
  }

  student.feeStatus.history.push({
    month,
    amount: Number(amount),
    type: type || "Monthly",
    status: status || "Paid",
    date: new Date()
  });

  if (status === "Paid") {
    student.feeStatus.totalPending = Math.max(0, (student.feeStatus.totalPending || 0) - Number(amount));
  } else {
    student.feeStatus.totalPending = (student.feeStatus.totalPending || 0) + Number(amount);
  }

  await student.save();
  return student.feeStatus;
};

module.exports = {
  getTeacherDashboard,
  getSchoolStudents,
  getStudentById,
  submitBatchAttendance,
  getAttendanceByDate,
  updateAttendance,
  updateResults,
  submitBatchMarks,
  createStudent,
  getStudentAttendanceHistory,
  updateStudentResult,
  addFeePayment
};
