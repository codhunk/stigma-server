const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  class: { type: String, required: true },
  section: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher", required: true },
  schoolCode: { type: String, required: true },
}, { timestamps: true });

const Assignment = mongoose.model("Assignment", assignmentSchema);
module.exports = Assignment;
