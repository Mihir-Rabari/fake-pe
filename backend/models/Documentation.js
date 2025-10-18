const mongoose = require('mongoose');

const documentationSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['getting-started', 'guides', 'api-reference', 'sdk', 'resources']
  },
  order: {
    type: Number,
    default: 0
  },
  published: {
    type: Boolean,
    default: false
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: {
    description: String,
    keywords: [String],
    lastUpdated: Date
  }
}, {
  timestamps: true
});

// Index for search
documentationSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Documentation', documentationSchema);
