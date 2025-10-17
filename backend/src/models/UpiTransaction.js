const mongoose = require('mongoose');

/**
 * UPI Transaction Model
 * Tracks UPI-specific transaction details
 */
const UpiTransactionSchema = new mongoose.Schema({
  txnId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  paymentId: {
    type: String,
    required: true,
    index: true
  },
  payerVpa: {
    type: String,
    required: true
  },
  payeeVpa: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  note: {
    type: String,
    maxlength: 200
  },
  upiRef: {
    type: String, // UTR number (Unique Transaction Reference)
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    enum: ['PENDING', 'SUCCESS', 'FAILED', 'EXPIRED'],
    default: 'PENDING'
  },
  errorCode: {
    type: String
  },
  errorMessage: {
    type: String
  },
  requestedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

UpiTransactionSchema.index({ payerVpa: 1, createdAt: -1 });
UpiTransactionSchema.index({ payeeVpa: 1, createdAt: -1 });

module.exports = mongoose.model('UpiTransaction', UpiTransactionSchema);
