const express = require("express");
const router = express.Router();
const Classroom = require("../models/Classroom");

// Route to create a classroom
router.post('/create', async (req, res) => {
    try {
        console.log('Received data:', req.body); // Log the incoming request body

        const newClassroom = new Classroom(req.body);
        await newClassroom.save();
        res.status(200).json({ message: 'Classroom created successfully' });
    } catch (error) {
        console.error('Error creating classroom:', error.message);

        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validation Error', details: error.message });
        }

        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
});

// Route to get a list of all classrooms
router.get("/all", async (req, res) => {
  try {
    const classrooms = await Classroom.find()
      .populate("teacherId", "name username")
      .populate("studentIds", "name username registerNo");
    res.status(200).json({ classrooms });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/teacher/:teacherId", async (req, res) => {
  try {
    console.log("Teacher ID in API:", req.params.teacherId); // For debugging
    const classroom = await Classroom.findOne({ teacherId: req.params.teacherId }).populate("studentIds");
    if (classroom) {
      res.json({ students: classroom.studentIds });
    } else {
      res.status(404).json({ message: "Classroom not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


// Route to remove a student from a classroom
router.delete("/teacher/student/:teacherId/:studentId", async (req, res) => {
  try {
    const classroom = await Classroom.findOneAndUpdate(
      { teacherId: req.params.teacherId },
      { $pull: { studentIds: req.params.studentId } },
      { new: true }
    ).populate("studentIds");

    if (classroom) {
      res.json({ students: classroom.studentIds });
    } else {
      res.status(404).json({ message: "Classroom not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
});

// Route to get all classrooms for a specific student
router.get("/student/:studentId", async (req, res) => {
  try {
    console.log("Student ID in API:", req.params.studentId); // Debugging log
    const classrooms = await Classroom.find({ studentIds: req.params.studentId })
      .populate("studentIds", "name username registerNo")
      .populate("teacherId", "name username");

    if (classrooms.length > 0) {
      res.status(200).json({ classrooms });
    } else {
      res.status(404).json({ message: "No classrooms found for this student" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", details: error.message });
  }
});


module.exports = router;
