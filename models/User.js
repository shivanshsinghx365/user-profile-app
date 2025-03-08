const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  interests: {
    type: [String],
    default: []
  },
  locations: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  travelType: {
    type: String,
    default: ''
  },
  budgetPreference: {
    type: String,
    default: ''
  },
  spendingRange: {
    type: Number, // Or String if you want to store it as text range like "100-500"
    default: 0     // Or default value as needed
  }
});

module.exports = mongoose.model('User', userSchema);
