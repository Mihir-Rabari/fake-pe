const Payment = require('../models/Payment');
const PaymentBackup = require('../models/PaymentBackup');
const WebhookAttempt = require('../models/WebhookAttempt');
const Wallet = require('../models/Wallet');
const QRCode = require('qrcode');
const mongoose = require('mongoose');
const { generatePaymentId, generateBackupId, generateWebhookAttemptId } = require('../utils/id-generator');
const { acquireLockWithRetry, releaseLock } = require('../utils/redis-lock');
const { PAYMENT_STATUS, REDIS_PREFIX } = require('../utils/constants');
const logger = require('../utils/logger');

/**
 * Create payment (idempotent)
 */
exports.createPayment = async (req, res) => {
  try {
    const { merchantId, amount, orderId, callbackUrl, recipientId, metadata } = req.body;
    const idempotencyKey = req.headers['idempotency-key'] || req.body.idempotencyKey;

    // Validation
    if (!merchantId || !amount || !orderId) {
      return res.status(400).json({ error: 'merchantId, amount, and orderId are required' });
    }

    // Check idempotency
    if (idempotencyKey) {
      const existing = await Payment.findOne({ idempotencyKey, merchantId });
      if (existing) {
        const paymentUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pay/${existing.paymentId}`;
        const qrData = await QRCode.toDataURL(paymentUrl);
        return res.json({
          paymentId: existing.paymentId,
          paymentUrl,
          qrData,
          status: existing.status
        });
      }
    }

    // Create payment
    const paymentId = generatePaymentId();
    const payment = new Payment({
      paymentId,
      merchantId,
      orderId,
      amount,
      recipientId,
      callbackUrl,
      metadata,
      idempotencyKey,
      status: PAYMENT_STATUS.CREATED
    });

    await payment.save();

    // Create backup
    const backup = new PaymentBackup({
      backupId: generateBackupId(),
      paymentId,
      snapshot: payment.toObject(),
      reason: 'created'
    });
    await backup.save();

    logger.info('Payment created', { paymentId, merchantId, amount });

    // Generate QR code
    const paymentUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/pay/${paymentId}`;
    const qrData = await QRCode.toDataURL(paymentUrl);

    res.status(201).json({
      paymentId,
      paymentUrl,
      qrData,
      status: payment.status,
      amount: payment.amount,
      currency: payment.currency
    });
  } catch (err) {
    logger.error('Create payment error', { error: err.message });
    res.status(500).json({ error: 'Failed to create payment' });
  }
};

/**
 * Get payment by ID
 */
exports.getPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({ payment });
  } catch (err) {
    logger.error('Get payment error', { error: err.message });
    res.status(500).json({ error: 'Failed to get payment' });
  }
};

/**
 * Get payment status
 */
exports.getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({ paymentId }, 'paymentId status amount completedAt');
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    res.json({
      paymentId: payment.paymentId,
      status: payment.status,
      amount: payment.amount,
      completedAt: payment.completedAt
    });
  } catch (err) {
    logger.error('Get payment status error', { error: err.message });
    res.status(500).json({ error: 'Failed to get payment status' });
  }
};

/**
 * Complete payment (customer action)
 */
exports.completePayment = async (req, res) => {
  const redis = req.app.get('redis');
  const { paymentId } = req.params;
  const { payer, method } = req.body;

  const lockKey = `${REDIS_PREFIX.LOCK_PAYMENT}${paymentId}`;
  let lockValue = null;

  try {
    // Acquire lock
    lockValue = await acquireLockWithRetry(redis, lockKey);
    if (!lockValue) {
      return res.status(409).json({ error: 'Payment is being processed' });
    }

    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get payment
      const payment = await Payment.findOne({ paymentId }).session(session);
      if (!payment) {
        await session.abortTransaction();
        return res.status(404).json({ error: 'Payment not found' });
      }

      if (payment.status !== PAYMENT_STATUS.CREATED) {
        await session.abortTransaction();
        return res.status(400).json({ error: 'Payment already processed' });
      }

      // Process payment based on method
      if (method === 'wallet') {
        // Debit payer wallet
        const payerWallet = await Wallet.findOne({ userId: payer }).session(session);
        if (!payerWallet || payerWallet.balance < payment.amount) {
          await session.abortTransaction();
          return res.status(402).json({ error: 'Insufficient funds' });
        }

        payerWallet.balance -= payment.amount;
        await payerWallet.save({ session });

        // Credit recipient or merchant
        const recipientId = payment.recipientId || payment.merchantId;
        await Wallet.findOneAndUpdate(
          { userId: recipientId },
          { $inc: { balance: payment.amount } },
          { upsert: true, session }
        );
      }

      // Update payment
      payment.status = PAYMENT_STATUS.COMPLETED;
      payment.payer = payer;
      payment.method = method;
      payment.completedAt = new Date();
      await payment.save({ session });

      // Create backup
      const backup = new PaymentBackup({
        backupId: generateBackupId(),
        paymentId,
        snapshot: payment.toObject(),
        reason: 'completed'
      });
      await backup.save({ session });

      // Create webhook attempt
      if (payment.callbackUrl) {
        const attempt = new WebhookAttempt({
          attemptId: generateWebhookAttemptId(),
          paymentId,
          callbackUrl: payment.callbackUrl,
          status: 'PENDING'
        });
        await attempt.save({ session });

        // Enqueue webhook
        await redis.lpush(REDIS_PREFIX.QUEUE_WEBHOOK, attempt.attemptId);
      }

      await session.commitTransaction();

      logger.info('Payment completed', { paymentId, payer, method, amount: payment.amount });

      res.json({
        success: true,
        payment: {
          paymentId: payment.paymentId,
          status: payment.status,
          amount: payment.amount,
          completedAt: payment.completedAt
        }
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    logger.error('Complete payment error', { error: err.message, paymentId });
    res.status(500).json({ error: 'Failed to complete payment' });
  } finally {
    // Release lock
    if (lockValue) {
      await releaseLock(redis, lockKey, lockValue);
    }
  }
};

/**
 * Confirm payment (merchant/admin)
 */
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentId, finalStatus, idempotencyKey } = req.body;

    if (!paymentId || !finalStatus) {
      return res.status(400).json({ error: 'paymentId and finalStatus required' });
    }

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Idempotent - if already in final status, return success
    if (payment.status === finalStatus) {
      return res.json({ success: true, payment });
    }

    payment.status = finalStatus;
    if (finalStatus === PAYMENT_STATUS.COMPLETED) {
      payment.completedAt = new Date();
    }
    await payment.save();

    // Create backup
    const backup = new PaymentBackup({
      backupId: generateBackupId(),
      paymentId,
      snapshot: payment.toObject(),
      reason: 'manual_confirm'
    });
    await backup.save();

    logger.info('Payment confirmed', { paymentId, finalStatus });

    res.json({ success: true, payment });
  } catch (err) {
    logger.error('Confirm payment error', { error: err.message });
    res.status(500).json({ error: 'Failed to confirm payment' });
  }
};

/**
 * List payments
 */
exports.listPayments = async (req, res) => {
  try {
    const { merchantId, status, limit = 50, offset = 0 } = req.query;

    const query = {};
    if (merchantId) query.merchantId = merchantId;
    if (status) query.status = status;

    const payments = await Payment.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await Payment.countDocuments(query);

    res.json({
      payments,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (err) {
    logger.error('List payments error', { error: err.message });
    res.status(500).json({ error: 'Failed to list payments' });
  }
};

/**
 * Get payment history
 */
exports.getPaymentHistory = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const backups = await PaymentBackup.find({ paymentId })
      .sort({ createdAt: -1 });

    res.json({ history: backups });
  } catch (err) {
    logger.error('Get payment history error', { error: err.message });
    res.status(500).json({ error: 'Failed to get payment history' });
  }
};

/**
 * Refund payment
 */
exports.refundPayment = async (req, res) => {
  const { paymentId } = req.params;
  const { amount, reason } = req.body;

  try {
    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status !== PAYMENT_STATUS.COMPLETED) {
      return res.status(400).json({ error: 'Only completed payments can be refunded' });
    }

    const refundAmount = amount || payment.amount;
    if (refundAmount > payment.amount) {
      return res.status(400).json({ error: 'Refund amount exceeds payment amount' });
    }

    // Start transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Update payment status
      payment.status = PAYMENT_STATUS.REFUNDED;
      payment.refundAmount = refundAmount;
      payment.refundReason = reason;
      payment.refundedAt = new Date();
      await payment.save({ session });

      // Credit payer wallet
      if (payment.payer) {
        await Wallet.findOneAndUpdate(
          { userId: payment.payer },
          { $inc: { balance: refundAmount } },
          { session }
        );
      }

      // Debit recipient wallet
      const recipientId = payment.recipientId || payment.merchantId;
      await Wallet.findOneAndUpdate(
        { userId: recipientId },
        { $inc: { balance: -refundAmount } },
        { session }
      );

      // Create backup
      const backup = new PaymentBackup({
        backupId: generateBackupId(),
        paymentId,
        snapshot: payment.toObject(),
        reason: 'refunded'
      });
      await backup.save({ session });

      // Create webhook for refund
      if (payment.callbackUrl) {
        const attempt = new WebhookAttempt({
          attemptId: generateWebhookAttemptId(),
          paymentId,
          callbackUrl: payment.callbackUrl,
          status: 'PENDING'
        });
        await attempt.save({ session });

        const redis = req.app.get('redis');
        await redis.lpush(REDIS_PREFIX.QUEUE_WEBHOOK, attempt.attemptId);
      }

      await session.commitTransaction();

      logger.info('Payment refunded', { paymentId, refundAmount });

      res.json({
        success: true,
        payment: {
          paymentId: payment.paymentId,
          status: payment.status,
          refundAmount,
          refundedAt: payment.refundedAt
        }
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    logger.error('Refund payment error', { error: err.message, paymentId });
    res.status(500).json({ error: 'Failed to refund payment' });
  }
};

/**
 * Get payment webhooks
 */
exports.getPaymentWebhooks = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const webhooks = await WebhookAttempt.find({ paymentId })
      .sort({ createdAt: -1 });

    res.json({ webhooks });
  } catch (err) {
    logger.error('Get payment webhooks error', { error: err.message });
    res.status(500).json({ error: 'Failed to get webhooks' });
  }
};
