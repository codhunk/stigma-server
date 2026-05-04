const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  schoolCode: { type: String, required: true },
  studentId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  emailId: { type: String, required: true, unique: true },
  schoolName: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String,
  },
  class: { type: String, required: true },
  section: { type: String, required: true },
  rollNo: { type: String, required: true },
  attendance: { type: String, default: "0%" },
  upcomingClasses: { type: Number, default: 0 },
  feeStatus: {
    amountDue: { type: Number, default: 0 },
    totalPending: { type: Number, default: 0 },
    history: [
      {
        month: { type: String },
        type: { type: String },
        amount: { type: Number },
        status: { type: String, enum: ["Paid", "Pending", "Overdue", "paid", "pending", "overdue"], default: "Pending" }
      }
    ]
  },
  results: [
    {
      semester: String,
      examType: { type: String, enum: ["Quiz", "Sessional", "Sessional 1", "Half-Yearly", "Sessional 2", "Yearly"] },
      subjects: [
        {
          name: String,
          marks: Number,
          totalMarks: { type: Number, default: 100 }
        }
      ],
      gpa: Number,
      lastUpdated: { type: Date, default: Date.now }
    }
  ],
  schedule: [
    {
      time: String,
      subject: String,
      room: String
    }
  ]
}, { timestamps: true });

studentSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
