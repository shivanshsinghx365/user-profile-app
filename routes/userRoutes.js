const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user by email
router.get('/api/user/:email', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create or update user
router.post('/api/user', async (req, res) => {
  try {
    const { name, email, interests, locations, travelType, budgetPreference, spendingRange } = req.body;
    
    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }
    
    // Find user by email or create new
    let user = await User.findOne({ email });
    
    if (user) {
      // Update existing user
      user.name = name;
      user.interests = interests || [];
      user.locations = locations || [];
      user.travelType = travelType || '';
      user.budgetPreference = budgetPreference || '';
      user.spendingRange = spendingRange || 0;
    } else {
      // Create new user
      user = new User({
        name,
        email,
        interests: interests || [],
        locations: locations || [],
        travelType,
        budgetPreference,
        spendingRange
      });
    }
    
    await user.save();
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
