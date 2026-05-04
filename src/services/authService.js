const Student = require("../models/Student");
const Teacher = require("../models/Teacher");

const register = async (userData) => {
  const { role, name, schoolCode, id, password, mobileNumber, emailId, schoolName } = userData;

  if (role === "student") {
    const studentExists = await Student.findOne({ studentId: id });
    if (studentExists) throw new Error("Student already exists");
    
    return await Student.create({
      name, schoolCode, studentId: id, password, mobileNumber, emailId, schoolName
    });
  } else if (role === "teacher") {
    const teacherExists = await Teacher.findOne({ teacherId: id });
    if (teacherExists) throw new Error("Teacher already exists");

    return await Teacher.create({
      name, schoolCode, teacherId: id, password, mobileNumber, emailId, schoolName
    });
  } else {
    throw new Error("Invalid role");
  }
};

const login = async (loginData) => {
  const { role, schoolCode, id, password } = loginData;
  let user;

  if (role === "student") {
    user = await Student.findOne({ schoolCode, studentId: id });
  } else if (role === "teacher") {
    user = await Teacher.findOne({ schoolCode, teacherId: id });
  } else {
    throw new Error("Invalid role");
  }

  if (user && (await user.matchPassword(password))) {
    return user;
  } else {
    throw new Error("Invalid ID, School Code or Password");
  }
};

const forgotPassword = async (data) => {
  const { role, id, emailId, newPassword } = data;
  let user;

  if (role === "student") {
    user = await Student.findOne({ studentId: id, emailId });
  } else if (role === "teacher") {
    user = await Teacher.findOne({ teacherId: id, emailId });
  } else {
    throw new Error("Invalid role");
  }

  if (!user) {
    throw new Error("User not found with provided ID and Email");
  }

  user.password = newPassword;
  await user.save();
  return user;
};

module.exports = { register, login, forgotPassword };

