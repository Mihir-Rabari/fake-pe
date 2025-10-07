const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Replay webhook
router.post('/payments/:paymentId/replay-webhook', adminController.replayWebhook);

// Reconciliation
router.post('/reconcile', adminController.reconcile);

module.exports = router;
