const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("./src/models/Student");
const Teacher = require("./src/models/Teacher");

const seedManyStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const schoolCode = "SCH001";
    const schoolName = "Stigma International";
    const classes = ["8", "9", "10", "11", "12"];
    const sections = ["A", "B"];

    const studentsToCreate = [];

    for (const className of classes) {
      for (let i = 1; i <= 10; i++) {
        const section = sections[i % 2];
        const studentId = `STU_${className}_${i}`;
        const emailId = `student_${className}_${i}@example.com`;
        
        studentsToCreate.push({
          name: `Student ${className} ${i}`,
          schoolCode,
          studentId,
          password: "password123",
          mobileNumber: `98765432${className}${i}`.substring(0, 10),
          emailId,
          schoolName,
          class: className,
          section,
          rollNo: (100 + i).toString(),
          attendance: "0%",
          upcomingClasses: 5,
          feeStatus: {
            amountDue: 5000,
            totalPending: 5000,
            history: [
              { month: "January", type: "Tuition Fee", amount: 5000, status: "paid" }
            ]
          },
          results: []
        });
      }
    }

    for (const s of studentsToCreate) {
      const existing = await Student.findOne({ studentId: s.studentId });
      if (!existing) {
        await Student.create(s);
      } else {
        Object.assign(existing, s);
        await existing.save();
      }
    }

    console.log(`Successfully seeded ${studentsToCreate.length} students across classes 8-12.`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding students:", error);
    process.exit(1);
  }
};

seedManyStudents();
