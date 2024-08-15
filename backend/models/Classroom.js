const mongoose = require("mongoose");

const durationSchema = new mongoose.Schema({
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

const classroomSchema = new mongoose.Schema({
  registerNo: {
    type: String,
    required: true,
  },
  duration: {
    Monday: { type: durationSchema, required: true },
    Tuesday: { type: durationSchema, required: true },
    Wednesday: { type: durationSchema, required: true },
    Thursday: { type: durationSchema, required: true },
    Friday: { type: durationSchema, required: true },
    Saturday: { type: durationSchema, required: true },
    Sunday: { type: durationSchema, required: true },
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  studentIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
  ],
});

const Classroom = mongoose.model("Classroom", classroomSchema);

module.exports = Classroom;
