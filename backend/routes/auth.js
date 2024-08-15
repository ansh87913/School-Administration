const express = require('express');
const Principal = require('../models/Principal');
const Teacher = require('../models/Teacher');
const Student = require('../models/Student');

const router = express.Router();

const getUserModel = (type) => {
  switch (type) {
    case 'student':
      return Student;
    case 'teacher':
      return Teacher;
    case 'principal':
      return Principal;
    default:
      return null;
  }
};

// Login Route
router.post('/login/:type', async (req, res) => {
    console.log('Received request body:', req.body); // Log the incoming request body
    const { username, password } = req.body;
    const { type } = req.params;

    const User = getUserModel(type);

    if (!User) {
      return res.status(400).json({ success: false, message: `Invalid user type` });
    }

    try {
      const user = await User.findOne({ username });
      console.log('Queried User:', user); // Log the found user

      if (!user) {
        return res.status(400).json({ success: false, message: `User not found for username: ${username}` });
      }

      if (password !== user.password) {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
      }

      res.json({ success: true, message: 'Login successful', userDetails: user });
    } catch (err) {
      console.error('Error during login process:', err); // Log any server errors
      res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Create User Route
router.post('/create/:type', async (req, res) => {
  const { name, registerNo, username, password } = req.body;
  const { type } = req.params;

  const User = getUserModel(type);

  if (!User) {
    return res.status(400).json({ success: false, message: 'Invalid user type' });
  }

  try {
    const newUser = new User({ name, registerNo, username, password });
    await newUser.save();
    res.json({ success: true, message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});


// Fetch Entities Route
router.get('/fetch/:type', async (req, res) => {
    const { type } = req.params;
  
    const User = getUserModel(type);
  
    if (!User) {
      return res.status(400).json({ success: false, message: 'Invalid user type' });
    }
  
    try {
      const users = await User.find({}, 'name registerNo username');
      res.json({ success: true, users });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete a user by ID
router.delete('/delete/:type/:id', async (req, res) => {
    const { type, id } = req.params;
    const User = getUserModel(type);
  
    if (!User) {
      return res.status(400).json({ success: false, message: 'Invalid user type' });
    }
  
    try {
      await User.findByIdAndDelete(id);
      res.json({ success: true, message: 'Record deleted successfully' });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update User Route
router.put('/update/:type/:id', async (req, res) => {
    const { type, id } = req.params;
    const User = getUserModel(type);
    const updateData = req.body;
  
    if (!User) {
      return res.status(400).json({ success: false, message: `Invalid user type` });
    }
  
    try {
      const user = await User.findByIdAndUpdate(id, updateData, { new: true });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      res.json({ success: true, message: 'User updated successfully', user });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
