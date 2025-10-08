const mongoose = require('mongoose');
const Redis = require('ioredis');
const fetch = require('node-fetch');
const logger = require('../utils/logger');
const WebhookAttempt = require('../models/WebhookAttempt');
const Payment = require('../models/Payment');
const Merchant = require('../models/Merchant');
const { generateHmacSignature } = require('../utils/crypto');
const { WEBHOOK_CONFIG, REDIS_PREFIX, WEBHOOK_STATUS } = require('../utils/constants');

const REDIS_URL = process.env.REDIS_URL;
const MAX_ATTEMPTS = parseInt(process.env.MAX_ATTEMPTS) || WEBHOOK_CONFIG.MAX_ATTEMPTS;
const BASE_BACKOFF_MS = parseInt(process.env.BASE_BACKOFF_MS) || WEBHOOK_CONFIG.BASE_BACKOFF_MS;
const MAX_BACKOFF_MS = parseInt(process.env.MAX_BACKOFF_MS) || WEBHOOK_CONFIG.MAX_BACKOFF_MS;

// Redis clients
const redis = new Redis(REDIS_URL);
const redisSub = new Redis(REDIS_URL);

/**
 * Calculate backoff delay
 */
function calculateBackoff(attempts) {
  const delay = Math.min(BASE_BACKOFF_MS * Math.pow(2, attempts - 1), MAX_BACKOFF_MS);
  return delay;
}

/**
 * Process webhook attempt
 */
async function processWebhookAttempt(attemptId) {
  try {
    const attempt = await WebhookAttempt.findOne({ attemptId });
    if (!attempt) {
      logger.warn('Webhook attempt not found', { attemptId });
      return;
    }

    // Get payment and merchant
    const payment = await Payment.findOne({ paymentId: attempt.paymentId });
    if (!payment) {
      logger.error('Payment not found for webhook', { attemptId, paymentId: attempt.paymentId });
      attempt.status = WEBHOOK_STATUS.FAILED;
      attempt.lastError = 'Payment not found';
      await attempt.save();
      return;
    }

    const merchant = await Merchant.findOne({ merchantId: payment.merchantId });
    if (!merchant) {
      logger.error('Merchant not found for webhook', { attemptId, merchantId: payment.merchantId });
      attempt.status = WEBHOOK_STATUS.FAILED;
      attempt.lastError = 'Merchant not found';
      await attempt.save();
      return;
    }

    // Prepare payload
    const payload = {
      paymentId: payment.paymentId,
      merchantId: payment.merchantId,
      orderId: payment.orderId,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      method: payment.method,
      payer: payment.payer,
      completedAt: payment.completedAt,
      metadata: payment.metadata
    };

    const payloadString = JSON.stringify(payload);
    const signature = generateHmacSignature(merchant.secret, payloadString);

    // Make HTTP request
    attempt.status = WEBHOOK_STATUS.IN_PROGRESS;
    attempt.attempts += 1;
    await attempt.save();

    logger.info('Delivering webhook', {
      attemptId,
      paymentId: payment.paymentId,
      attempt: attempt.attempts,
      url: attempt.callbackUrl
    });

    const response = await fetch(attempt.callbackUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-merchant-id': payment.merchantId,
        'x-signature': signature,
        'x-attempt-id': attemptId,
        'x-timestamp': Date.now().toString()
      },
      body: payloadString,
      timeout: WEBHOOK_CONFIG.TIMEOUT_MS
    });

    if (response.ok) {
      // Success
      attempt.status = WEBHOOK_STATUS.DELIVERED;
      attempt.deliveredAt = new Date();
      await attempt.save();

      logger.info('Webhook delivered successfully', {
        attemptId,
        paymentId: payment.paymentId,
        statusCode: response.status
      });
    } else {
      // HTTP error
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
  } catch (err) {
    logger.error('Webhook delivery failed', {
      attemptId,
      error: err.message
    });

    // Update attempt
    const attempt = await WebhookAttempt.findOne({ attemptId });
    if (attempt) {
      attempt.lastError = err.message;

      if (attempt.attempts >= MAX_ATTEMPTS) {
        // Max attempts reached
        attempt.status = WEBHOOK_STATUS.FAILED;
        await attempt.save();
        logger.error('Webhook max attempts reached', { attemptId, attempts: attempt.attempts });
      } else {
        // Schedule retry
        const backoffMs = calculateBackoff(attempt.attempts);
        attempt.nextRunAt = new Date(Date.now() + backoffMs);
        attempt.status = WEBHOOK_STATUS.RETRY;
        await attempt.save();

        // Add to scheduled set
        await redis.zadd(
          REDIS_PREFIX.SCHEDULED_WEBHOOK,
          attempt.nextRunAt.getTime(),
          attemptId
        );

        logger.info('Webhook scheduled for retry', {
          attemptId,
          nextRunAt: attempt.nextRunAt,
          backoffMs
        });
      }
    }
  }
}

/**
 * Main worker loop
 */
async function startWorker() {
  logger.info('🔔 Webhook Worker started');

  while (true) {
    try {
      // Blocking pop from queue
      const result = await redis.brpoplpush(
        REDIS_PREFIX.QUEUE_WEBHOOK,
        REDIS_PREFIX.PROCESSING_WEBHOOK,
        0
      );

      if (result) {
        const attemptId = result;
        await processWebhookAttempt(attemptId);

        // Remove from processing queue
        await redis.lrem(REDIS_PREFIX.PROCESSING_WEBHOOK, 0, attemptId);
      }
    } catch (err) {
      logger.error('Worker error', { error: err.message });
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }
}

/**
 * Scheduler - move due items from scheduled set to queue
 */
async function startScheduler() {
  logger.info('📅 Webhook Scheduler started');

  setInterval(async () => {
    try {
      const now = Date.now();
      const due = await redis.zrangebyscore(
        REDIS_PREFIX.SCHEDULED_WEBHOOK,
        0,
        now,
        'LIMIT',
        0,
        100
      );

      if (due.length > 0) {
        logger.info('Moving due webhooks to queue', { count: due.length });

        for (const attemptId of due) {
          await redis.lpush(REDIS_PREFIX.QUEUE_WEBHOOK, attemptId);
          await redis.zrem(REDIS_PREFIX.SCHEDULED_WEBHOOK, attemptId);
        }
      }
    } catch (err) {
      logger.error('Scheduler error', { error: err.message });
    }
  }, 2000); // Check every 2 seconds
}

// Start worker and scheduler
startWorker();
startScheduler();

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down webhook worker');
  redis.quit(() => {
    redisSub.quit(() => {
      process.exit(0);
    });
  });
});

module.exports = { processWebhookAttempt };
