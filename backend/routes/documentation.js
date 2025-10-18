const express = require('express');
const router = express.Router();
const Documentation = require('../models/Documentation');
const auth = require('../middleware/auth'); // Assuming you have auth middleware

// Get all published docs (public)
router.get('/', async (req, res) => {
  try {
    const { category, search } = req.query;
    
    let query = { published: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$text = { $search: search };
    }
    
    const docs = await Documentation.find(query)
      .sort({ order: 1, createdAt: -1 })
      .select('-__v');
    
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single doc by slug (public)
router.get('/:slug', async (req, res) => {
  try {
    const doc = await Documentation.findOne({ 
      slug: req.params.slug,
      published: true 
    });
    
    if (!doc) {
      return res.status(404).json({ error: 'Documentation not found' });
    }
    
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin routes (protected)

// Get all docs including unpublished (admin only)
router.get('/admin/all', auth, async (req, res) => {
  try {
    const docs = await Documentation.find()
      .sort({ category: 1, order: 1 })
      .populate('author', 'name email');
    
    res.json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new doc (admin only)
router.post('/', auth, async (req, res) => {
  try {
    const doc = new Documentation({
      ...req.body,
      author: req.user.id
    });
    
    await doc.save();
    
    res.status(201).json(doc);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Slug already exists' });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update doc (admin only)
router.put('/:id', auth, async (req, res) => {
  try {
    const doc = await Documentation.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        'metadata.lastUpdated': new Date()
      },
      { new: true, runValidators: true }
    );
    
    if (!doc) {
      return res.status(404).json({ error: 'Documentation not found' });
    }
    
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete doc (admin only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const doc = await Documentation.findByIdAndDelete(req.params.id);
    
    if (!doc) {
      return res.status(404).json({ error: 'Documentation not found' });
    }
    
    res.json({ message: 'Documentation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Toggle publish status (admin only)
router.patch('/:id/publish', auth, async (req, res) => {
  try {
    const doc = await Documentation.findById(req.params.id);
    
    if (!doc) {
      return res.status(404).json({ error: 'Documentation not found' });
    }
    
    doc.published = !doc.published;
    await doc.save();
    
    res.json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
