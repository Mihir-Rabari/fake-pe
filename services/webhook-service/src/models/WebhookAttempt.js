const mongoose = require('mongoose');
const { WEBHOOK_STATUS } = require('@expe/shared');

const WebhookAttemptSchema = new mongoose.Schema({
  attemptId: {
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
  callbackUrl: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: Object.values(WEBHOOK_STATUS),
    default: WEBHOOK_STATUS.PENDING,
    index: true
  },
  attempts: {
    type: Number,
    default: 0
  },
  nextRunAt: {
    type: Date,
    index: true
  },
  lastError: {
    type: String
  },
  deliveredAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

WebhookAttemptSchema.index({ status: 1, nextRunAt: 1 });

module.exports = mongoose.model('WebhookAttempt', WebhookAttemptSchema);
