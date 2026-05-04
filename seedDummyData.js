const mongoose = require("mongoose");
require("dotenv").config();
const Student = require("./src/models/Student");

const seedDummyData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB");

    const students = await Student.find({});

    const dummyResults = [
      {
        semester: "1st Semester",
        examType: "Sessional 1",
        subjects: [
          { name: "Mathematics", marks: 85, totalMarks: 100 },
          { name: "Physics", marks: 78, totalMarks: 100 },
          { name: "Chemistry", marks: 92, totalMarks: 100 },
          { name: "English", marks: 88, totalMarks: 100 },
          { name: "Computer Science", marks: 95, totalMarks: 100 }
        ],
        gpa: 8.76
      },
      {
        semester: "1st Semester",
        examType: "Half-Yearly",
        subjects: [
          { name: "Mathematics", marks: 82, totalMarks: 100 },
          { name: "Physics", marks: 80, totalMarks: 100 },
          { name: "Chemistry", marks: 89, totalMarks: 100 },
          { name: "English", marks: 85, totalMarks: 100 },
          { name: "Computer Science", marks: 91, totalMarks: 100 }
        ],
        gpa: 8.54
      }
    ];

    const dummyFeesHistory = [
      { month: "January", type: "Quarter 1 Fee", amount: 5000, status: "paid" },
      { month: "April", type: "Quarter 2 Fee", amount: 5000, status: "paid" },
      { month: "July", type: "Quarter 3 Fee", amount: 5000, status: "pending" }
    ];

    for (const student of students) {
      student.results = dummyResults;
      student.feeStatus = {
        amountDue: 5000,
        totalPending: 5000,
        history: dummyFeesHistory
      };
      await student.save();
    }

    console.log(`Successfully updated ${students.length} students with dummy data.`);
    process.exit(0);
  } catch (error) {
    console.error("Error updating dummy data:", error);
    process.exit(1);
  }
};

seedDummyData();
