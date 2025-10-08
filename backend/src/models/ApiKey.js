const mongoose = require('mongoose');
const { API_KEY_TYPE } = require('../utils/constants');

const ApiKeySchema = new mongoose.Schema({
  keyId: {
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
  projectId: {
    type: String,
    required: true,
    index: true
  },
  key: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  type: {
    type: String,
    enum: Object.values(API_KEY_TYPE),
    required: true
  },
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

ApiKeySchema.index({ merchantId: 1, projectId: 1 });

module.exports = mongoose.model('ApiKey', ApiKeySchema);
