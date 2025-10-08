const mongoose = require('mongoose');
const { PAYMENT_STATUS, PAYMENT_METHOD, CURRENCY } = require('../utils/constants');

const PaymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  merchantId: {
    type: String,
    required: true,
    index: true
  },
  orderId: {
    type: String,
    required: true
  },
  recipientId: {
    type: String,
    index: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    enum: Object.values(CURRENCY),
    default: CURRENCY.INR
  },
  status: {
    type: String,
    enum: Object.values(PAYMENT_STATUS),
    default: PAYMENT_STATUS.CREATED,
    index: true
  },
  method: {
    type: String,
    enum: Object.values(PAYMENT_METHOD)
  },
  payer: {
    type: String
  },
  callbackUrl: {
    type: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  idempotencyKey: {
    type: String,
    sparse: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Compound indexes
PaymentSchema.index({ merchantId: 1, status: 1 });
PaymentSchema.index({ merchantId: 1, createdAt: -1 });
PaymentSchema.index({ payer: 1, createdAt: -1 });

module.exports = mongoose.model('Payment', PaymentSchema);
