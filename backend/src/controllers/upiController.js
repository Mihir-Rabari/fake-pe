const UpiVpa = require('../models/UpiVpa');
const UpiTransaction = require('../models/UpiTransaction');
const Payment = require('../models/Payment');
const Wallet = require('../models/Wallet');
const WebhookAttempt = require('../models/WebhookAttempt');
const mongoose = require('mongoose');
const { generateUpiIntent, generateUtr, validateVpa, generateUpiTxnId } = require('../utils/upi-helper');
const { generateWebhookAttemptId } = require('../utils/id-generator');
const { PAYMENT_STATUS, REDIS_PREFIX } = require('../utils/constants');
const logger = require('../utils/logger');
const QRCode = require('qrcode');

/**
 * Create UPI VPA for user
 */
exports.createVpa = async (req, res) => {
  try {
    const { userId, vpa } = req.body;

    if (!userId || !vpa) {
      return res.status(400).json({ error: 'userId and vpa are required' });
    }

    // Validate VPA format
    if (!validateVpa(vpa)) {
      return res.status(400).json({ error: 'Invalid VPA format. Use format: username@provider' });
    }

    // Check if VPA already exists
    const existing = await UpiVpa.findOne({ vpa: vpa.toLowerCase() });
    if (existing) {
      return res.status(409).json({ error: 'VPA already exists' });
    }

    // Check if user already has a VPA
    const userVpas = await UpiVpa.find({ userId });
    const isPrimary = userVpas.length === 0;

    const upiVpa = new UpiVpa({
      vpaId: `vpa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      vpa: vpa.toLowerCase(),
      isPrimary
    });

    await upiVpa.save();

    logger.info('UPI VPA created', { userId, vpa });

    res.status(201).json({
      success: true,
      vpa: upiVpa
    });
  } catch (err) {
    logger.error('Create VPA error', { error: err.message });
    res.status(500).json({ error: 'Failed to create VPA' });
  }
};

/**
 * Get user's VPAs
 */
exports.getUserVpas = async (req, res) => {
  try {
    const { userId } = req.params;

    const vpas = await UpiVpa.find({ userId, status: 'ACTIVE' })
      .sort({ isPrimary: -1, createdAt: -1 });

    res.json({ vpas });
  } catch (err) {
    logger.error('Get VPAs error', { error: err.message });
    res.status(500).json({ error: 'Failed to get VPAs' });
  }
};

/**
 * Initiate UPI payment
 */
exports.initiateUpiPayment = async (req, res) => {
  try {
    const { paymentId, payerVpa } = req.body;

    if (!paymentId || !payerVpa) {
      return res.status(400).json({ error: 'paymentId and payerVpa are required' });
    }

    // Get payment
    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    if (payment.status !== PAYMENT_STATUS.CREATED) {
      return res.status(400).json({ error: 'Payment already processed' });
    }

    // Verify payer VPA exists
    const payerVpaDoc = await UpiVpa.findOne({ vpa: payerVpa.toLowerCase(), status: 'ACTIVE' });
    if (!payerVpaDoc) {
      return res.status(404).json({ error: 'Payer VPA not found' });
    }

    // Get or create payee VPA (merchant VPA)
    let payeeVpa = await UpiVpa.findOne({ userId: payment.merchantId, isPrimary: true });
    if (!payeeVpa) {
      // Create default merchant VPA
      payeeVpa = new UpiVpa({
        vpaId: `vpa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: payment.merchantId,
        vpa: `merchant${payment.merchantId.slice(-8)}@fakepay`,
        isPrimary: true,
        isVerified: true
      });
      await payeeVpa.save();
    }

    // Create UPI transaction
    const txnId = generateUpiTxnId();
    const upiTxn = new UpiTransaction({
      txnId,
      paymentId,
      payerVpa: payerVpa.toLowerCase(),
      payeeVpa: payeeVpa.vpa,
      amount: payment.amount,
      note: payment.metadata?.note || `Payment for Order ${payment.orderId}`,
      status: 'PENDING'
    });

    await upiTxn.save();

    // Update payment status to PENDING
    payment.status = PAYMENT_STATUS.PENDING;
    payment.method = 'upi';
    await payment.save();

    logger.info('UPI payment initiated', { txnId, paymentId, payerVpa });

    res.json({
      success: true,
      txnId,
      payerVpa: payerVpa.toLowerCase(),
      payeeVpa: payeeVpa.vpa,
      amount: payment.amount,
      status: 'PENDING'
    });
  } catch (err) {
    logger.error('Initiate UPI payment error', { error: err.message });
    res.status(500).json({ error: 'Failed to initiate UPI payment' });
  }
};

/**
 * Confirm UPI payment (called from user app)
 */
exports.confirmUpiPayment = async (req, res) => {
  try {
    const { txnId, pin } = req.body;

    if (!txnId) {
      return res.status(400).json({ error: 'txnId is required' });
    }

    // Get UPI transaction
    const upiTxn = await UpiTransaction.findOne({ txnId });
    if (!upiTxn) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (upiTxn.status !== 'PENDING') {
      return res.status(400).json({ error: 'Transaction already processed' });
    }

    // Start MongoDB session for transaction
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Get payer VPA and wallet
      const payerVpaDoc = await UpiVpa.findOne({ vpa: upiTxn.payerVpa }).session(session);
      const payerWallet = await Wallet.findOne({ userId: payerVpaDoc.userId }).session(session);

      // Check balance
      if (!payerWallet || payerWallet.balance < upiTxn.amount) {
        upiTxn.status = 'FAILED';
        upiTxn.errorCode = 'INSUFFICIENT_FUNDS';
        upiTxn.errorMessage = 'Insufficient balance in wallet';
        await upiTxn.save({ session });
        await session.abortTransaction();
        
        return res.status(402).json({ 
          success: false,
          error: 'Insufficient funds',
          txnId 
        });
      }

      // Debit payer wallet
      payerWallet.balance -= upiTxn.amount;
      await payerWallet.save({ session });

      // Get payee VPA and credit wallet
      const payeeVpaDoc = await UpiVpa.findOne({ vpa: upiTxn.payeeVpa }).session(session);
      await Wallet.findOneAndUpdate(
        { userId: payeeVpaDoc.userId },
        { $inc: { balance: upiTxn.amount } },
        { upsert: true, session }
      );

      // Update UPI transaction
      upiTxn.status = 'SUCCESS';
      upiTxn.upiRef = generateUtr();
      upiTxn.completedAt = new Date();
      await upiTxn.save({ session });

      // Update payment
      const payment = await Payment.findOne({ paymentId: upiTxn.paymentId }).session(session);
      payment.status = PAYMENT_STATUS.COMPLETED;
      payment.payer = payerVpaDoc.userId;
      payment.completedAt = new Date();
      await payment.save({ session });

      // Create webhook attempt
      if (payment.callbackUrl) {
        const attempt = new WebhookAttempt({
          attemptId: generateWebhookAttemptId(),
          paymentId: payment.paymentId,
          callbackUrl: payment.callbackUrl,
          status: 'PENDING'
        });
        await attempt.save({ session });

        const redis = req.app.get('redis');
        await redis.lpush(REDIS_PREFIX.QUEUE_WEBHOOK, attempt.attemptId);
      }

      await session.commitTransaction();

      logger.info('UPI payment confirmed', { txnId, upiRef: upiTxn.upiRef });

      res.json({
        success: true,
        txnId,
        upiRef: upiTxn.upiRef,
        status: 'SUCCESS',
        amount: upiTxn.amount,
        payerVpa: upiTxn.payerVpa,
        payeeVpa: upiTxn.payeeVpa
      });
    } catch (err) {
      await session.abortTransaction();
      throw err;
    } finally {
      session.endSession();
    }
  } catch (err) {
    logger.error('Confirm UPI payment error', { error: err.message });
    res.status(500).json({ error: 'Failed to confirm UPI payment' });
  }
};

/**
 * Get UPI transaction details
 */
exports.getUpiTransaction = async (req, res) => {
  try {
    const { txnId } = req.params;

    const upiTxn = await UpiTransaction.findOne({ txnId });
    if (!upiTxn) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ transaction: upiTxn });
  } catch (err) {
    logger.error('Get UPI transaction error', { error: err.message });
    res.status(500).json({ error: 'Failed to get transaction' });
  }
};

/**
 * Generate UPI intent and QR code
 */
exports.generateUpiQr = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({ paymentId });
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }

    // Get or create payee VPA
    let payeeVpa = await UpiVpa.findOne({ userId: payment.merchantId, isPrimary: true });
    if (!payeeVpa) {
      payeeVpa = new UpiVpa({
        vpaId: `vpa_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        userId: payment.merchantId,
        vpa: `merchant${payment.merchantId.slice(-8)}@fakepay`,
        isPrimary: true,
        isVerified: true
      });
      await payeeVpa.save();
    }

    // Generate UPI intent
    const upiIntent = generateUpiIntent({
      payeeVpa: payeeVpa.vpa,
      payeeName: 'FakePay Merchant',
      amount: payment.amount,
      transactionId: paymentId,
      transactionNote: `Payment for Order ${payment.orderId}`
    });

    // Generate QR code
    const qrCodeData = await QRCode.toDataURL(upiIntent);

    res.json({
      upiIntent,
      qrCodeData,
      payeeVpa: payeeVpa.vpa,
      amount: payment.amount,
      paymentId
    });
  } catch (err) {
    logger.error('Generate UPI QR error', { error: err.message });
    res.status(500).json({ error: 'Failed to generate UPI QR' });
  }
};

/**
 * Get user's UPI transaction history
 */
exports.getUpiTransactionHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 50, offset = 0 } = req.query;

    // Get user's VPAs
    const vpas = await UpiVpa.find({ userId });
    const vpaList = vpas.map(v => v.vpa);

    // Get transactions
    const transactions = await UpiTransaction.find({
      $or: [
        { payerVpa: { $in: vpaList } },
        { payeeVpa: { $in: vpaList } }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(offset));

    const total = await UpiTransaction.countDocuments({
      $or: [
        { payerVpa: { $in: vpaList } },
        { payeeVpa: { $in: vpaList } }
      ]
    });

    res.json({
      transactions,
      total,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });
  } catch (err) {
    logger.error('Get UPI transaction history error', { error: err.message });
    res.status(500).json({ error: 'Failed to get transaction history' });
  }
};

module.exports = exports;
