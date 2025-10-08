const express = require('express');
const router = express.Router();
const WebhookAttempt = require('../models/WebhookAttempt');
const { REDIS_PREFIX } = require('../utils/constants');
const logger = require('../utils/logger');

// Get webhook attempts
router.get('/attempts', async (req, res) => {
  try {
    const { paymentId } = req.query;
    const query = paymentId ? { paymentId } : {};
    
    const attempts = await WebhookAttempt.find(query)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({ attempts });
  } catch (err) {
    logger.error('Get webhook attempts error', { error: err.message });
    res.status(500).json({ error: 'Failed to get webhook attempts' });
  }
});

// Retry webhook
router.post('/:attemptId/retry', async (req, res) => {
  try {
    const { attemptId } = req.params;
    
    const attempt = await WebhookAttempt.findOne({ attemptId });
    if (!attempt) {
      return res.status(404).json({ error: 'Webhook attempt not found' });
    }

    // Reset and queue
    attempt.status = 'PENDING';
    attempt.nextRunAt = new Date();
    await attempt.save();

    const redis = req.app.get('redis');
    await redis.lpush(REDIS_PREFIX.QUEUE_WEBHOOK, attemptId);

    logger.info('Webhook retry queued', { attemptId });

    res.json({ success: true, message: 'Webhook retry queued' });
  } catch (err) {
    logger.error('Retry webhook error', { error: err.message });
    res.status(500).json({ error: 'Failed to retry webhook' });
  }
});

module.exports = router;
