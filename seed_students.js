const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Student = require("./src/models/Student");

dotenv.config();

const classes = ["8", "9", "10", "11", "12"];
const sections = ["A", "B"];
const schoolCode = "SCH321";
const schoolName = "Stigma High";

const seedStudents = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing dummy students to avoid duplicates if needed
    // await Student.deleteMany({ schoolCode: schoolCode });

    const students = [];
    for (const className of classes) {
      for (const section of sections) {
        for (let i = 1; i <= 10; i++) {
          const rollNo = i.toString().padStart(2, '0');
          const studentId = `S${className}${section}${rollNo}`;
          
          students.push({
            name: `Student ${className}${section} ${rollNo}`,
            schoolCode: schoolCode,
            studentId: studentId,
            password: "password123", // Will be hashed by pre-save hook
            mobileNumber: `98765432${className}${i}`,
            emailId: `student${studentId.toLowerCase()}@stigma.com`,
            schoolName: schoolName,
            class: className,
            section: section,
            rollNo: rollNo,
            attendance: "0%",
            upcomingClasses: 0,
            feeStatus: {
              amountDue: 5000,
              totalPending: 2000,
              history: []
            },
            results: [],
            schedule: []
          });
        }
      }
    }

    console.log(`⏳ Inserting ${students.length} students...`);
    
    // Using insertMany for performance
    // We use a loop or handle duplicates if they exist
    for (const student of students) {
        try {
            await Student.create(student);
        } catch (err) {
            if (err.code === 11000) {
                // Skip duplicates
                // console.log(`Skipping duplicate: ${student.studentId}`);
            } else {
                console.error(`Error inserting ${student.studentId}:`, err.message);
            }
        }
    }

    console.log("✅ Seeding completed!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
};

seedStudents();
