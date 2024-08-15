const mongoose = require('mongoose');

const principalSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plain text password
}, { collection: 'principals'});

module.exports = mongoose.model('Principal', principalSchema);
