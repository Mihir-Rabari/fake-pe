const Merchant = require('../models/Merchant');
const { generateSecret } = require('@expe/shared');
const logger = require('../utils/logger');

/**
 * Create merchant account
 */
exports.createMerchant = async (req, res) => {
  try {
    const { merchantId, userId, name, email, webhookUrl } = req.body;

    if (!merchantId || !userId || !name || !email) {
      return res.status(400).json({ error: 'merchantId, userId, name, and email are required' });
    }

    // Check if merchant already exists
    const existing = await Merchant.findOne({ merchantId });
    if (existing) {
      return res.status(400).json({ error: 'Merchant already exists' });
    }

    // Generate secret for webhook signing
    const secret = generateSecret();

    const merchant = new Merchant({
      merchantId,
      userId,
      name,
      email,
      secret,
      webhookUrl
    });

    await merchant.save();

    logger.info('Merchant created', { merchantId, userId, name });

    res.status(201).json({
      merchant: {
        merchantId: merchant.merchantId,
        name: merchant.name,
        email: merchant.email,
        webhookUrl: merchant.webhookUrl,
        createdAt: merchant.createdAt
      },
      secret // Return secret only on creation
    });
  } catch (err) {
    logger.error('Create merchant error', { error: err.message });
    res.status(500).json({ error: 'Failed to create merchant' });
  }
};

/**
 * Get merchant details
 */
exports.getMerchant = async (req, res) => {
  try {
    const { merchantId } = req.params;

    const merchant = await Merchant.findOne({ merchantId }, '-secret');
    if (!merchant) {
      return res.status(404).json({ error: 'Merchant not found' });
    }

    res.json({ merchant });
  } catch (err) {
    logger.error('Get merchant error', { error: err.message });
    res.status(500).json({ error: 'Failed to get merchant' });
  }
};

/**
 * Update merchant
 */
exports.updateMerchant = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const { name, webhookUrl } = req.body;

    const merchant = await Merchant.findOneAndUpdate(
      { merchantId },
      { name, webhookUrl, updatedAt: new Date() },
      { new: true, fields: '-secret' }
    );

    if (!merchant) {
      return res.status(404).json({ error: 'Merchant not found' });
    }

    logger.info('Merchant updated', { merchantId });

    res.json({ merchant });
  } catch (err) {
    logger.error('Update merchant error', { error: err.message });
    res.status(500).json({ error: 'Failed to update merchant' });
  }
};

/**
 * Get merchant stats
 */
exports.getMerchantStats = async (req, res) => {
  try {
    const { merchantId } = req.params;

    // This would typically aggregate data from Payment service
    // For now, return placeholder stats
    const stats = {
      merchantId,
      totalPayments: 0,
      totalAmount: 0,
      successRate: 0,
      activeProjects: 0
    };

    res.json({ stats });
  } catch (err) {
    logger.error('Get merchant stats error', { error: err.message });
    res.status(500).json({ error: 'Failed to get stats' });
  }
};

/**
 * Get merchant analytics
 */
exports.getMerchantAnalytics = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const { from, to } = req.query;

    // Mock analytics data
    const analytics = {
      merchantId,
      period: { from, to },
      revenue: {
        total: 0,
        trend: '+12%'
      },
      payments: {
        total: 0,
        completed: 0,
        failed: 0,
        pending: 0
      },
      averageTransactionValue: 0,
      topPaymentMethods: [
        { method: 'wallet', count: 0, percentage: 0 }
      ]
    };

    res.json({ analytics });
  } catch (err) {
    logger.error('Get merchant analytics error', { error: err.message });
    res.status(500).json({ error: 'Failed to get analytics' });
  }
};

/**
 * Get merchant transactions
 */
exports.getMerchantTransactions = async (req, res) => {
  try {
    const { merchantId } = req.params;
    const { page = 1, limit = 50 } = req.query;

    // This would fetch from Payment service
    const transactions = {
      merchantId,
      transactions: [],
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: 0,
        pages: 0
      }
    };

    res.json(transactions);
  } catch (err) {
    logger.error('Get merchant transactions error', { error: err.message });
    res.status(500).json({ error: 'Failed to get transactions' });
  }
};
