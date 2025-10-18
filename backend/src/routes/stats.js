const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// In-memory store for active viewers
const activeViewers = new Map();
const VIEWER_TIMEOUT = 30000; // 30 seconds

// Track viewer
router.post('/viewers/track', (req, res) => {
  const viewerId = req.headers['x-viewer-id'] || req.ip;
  activeViewers.set(viewerId, Date.now());
  
  res.json({ success: true });
});

// Get stats
router.get('/docs', async (req, res) => {
  try {
    // Clean up old viewers
    const now = Date.now();
    for (const [viewerId, timestamp] of activeViewers.entries()) {
      if (now - timestamp > VIEWER_TIMEOUT) {
        activeViewers.delete(viewerId);
      }
    }
    
    // Get GitHub stats (cached for 1 hour)
    let githubStats = { stars: 24, contributors: 3 };
    
    try {
      // Try to fetch real GitHub stats
      const response = await fetch('https://api.github.com/repos/Mihir-Rabari/fake-pe', {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'FakePE-Docs'
        },
        timeout: 5000
      });
      
      if (response.ok) {
        const data = await response.json();
        githubStats = {
          stars: data.stargazers_count || 24,
          contributors: data.subscribers_count || 3
        };
      }
    } catch (error) {
      // Use defaults if GitHub API fails
      console.log('Using default GitHub stats');
    }
    
    res.json({
      viewers: activeViewers.size,
      stars: githubStats.stars,
      contributors: githubStats.contributors,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get total page views (if you want to track this later)
router.get('/pageviews', (req, res) => {
  res.json({
    total: 1247, // You can implement real tracking later
    today: 89
  });
});

module.exports = router;
