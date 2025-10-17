const mongoose = require('mongoose');

/**
 * UPI Virtual Payment Address (VPA) Model
 * Simulates UPI IDs like user@fakepay, merchant@fakepay
 */
const UpiVpaSchema = new mongoose.Schema({
  vpaId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  userId: {
    type: String,
    required: true,
    index: true
  },
  vpa: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[a-z0-9._-]+@[a-z0-9]+$/
  },
  isPrimary: {
    type: Boolean,
    default: false
  },
  isVerified: {
    type: Boolean,
    default: true
  },
  bankName: {
    type: String,
    default: 'FakePay Bank'
  },
  status: {
    type: String,
    enum: ['ACTIVE', 'BLOCKED', 'DELETED'],
    default: 'ACTIVE'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Ensure only one primary VPA per user
UpiVpaSchema.index({ userId: 1, isPrimary: 1 });

module.exports = mongoose.model('UpiVpa', UpiVpaSchema);
