const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  registerNo: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true }, // Changed from email to username
  password: { type: String, required: true }
});

module.exports = mongoose.model('Student', studentSchema);