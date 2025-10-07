const Payment = require('../models/Payment');
const WebhookAttempt = require('../models/WebhookAttempt');
const { generateWebhookAttemptId, REDIS_PREFIX } = require('@expe/shared');
const logger = require('../utils/logger');

/**
 * Replay webhook for a payment
 */
exports.replayWebhook = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const redis = req.app.get('redis');

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (!payment.callbackUrl) {
      return res.status(400).json({ error: 'No callback URL configured' });
    }

    // Create new webhook attempt
    const attempt = new WebhookAttempt({
      attemptId: generateWebhookAttemptId(),
      paymentId,
      callbackUrl: payment.callbackUrl,
      status: 'PENDING'
    });
    await attempt.save();

    // Enqueue
    await redis.lpush(REDIS_PREFIX.QUEUE_WEBHOOK, attempt.attemptId);

    logger.info('Webhook replayed', { paymentId, attemptId: attempt.attemptId });

    res.json({
      success: true,
      message: 'Webhook queued for delivery',
      attemptId: attempt.attemptId
    });
  } catch (err) {
    logger.error('Replay webhook error', { error: err.message });
    res.status(500).json({ error: 'Failed to replay webhook' });
  }
};

/**
 * Reconciliation - find and fix stuck payments
 */
exports.reconcile = async (req, res) => {
  try {
    const { dryRun = true } = req.body;

    // Find payments stuck in CREATED for > 1 hour
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const stuckPayments = await Payment.find({
      status: 'CREATED',
      createdAt: { $lt: oneHourAgo }
    });

    const results = {
      found: stuckPayments.length,
      fixed: 0,
      payments: []
    };

    if (!dryRun) {
      for (const payment of stuckPayments) {
        // Mark as FAILED
        payment.status = 'FAILED';
        await payment.save();
        results.fixed++;
        results.payments.push(payment.paymentId);
      }
    } else {
      results.payments = stuckPayments.map(p => p.paymentId);
    }

    logger.info('Reconciliation completed', { dryRun, ...results });

    res.json({
      success: true,
      dryRun,
      ...results
    });
  } catch (err) {
    logger.error('Reconciliation error', { error: err.message });
    res.status(500).json({ error: 'Reconciliation failed' });
  }
};
