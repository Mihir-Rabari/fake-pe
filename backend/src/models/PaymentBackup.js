const mongoose = require('mongoose');

const PaymentBackupSchema = new mongoose.Schema({
  backupId: {
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
  snapshot: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
});

// Compound index
PaymentBackupSchema.index({ paymentId: 1, createdAt: -1 });

module.exports = mongoose.model('PaymentBackup', PaymentBackupSchema);
