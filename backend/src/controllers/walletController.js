const Wallet = require('../models/Wallet');
const Payment = require('../models/Payment');
const User = require('../models/User');
const { generatePaymentId } = require('../utils/id-generator');
const { PAYMENT_STATUS, PAYMENT_METHOD } = require('../utils/constants');
const logger = require('../utils/logger');

/**
 * Get wallet balance
 */
exports.getWallet = async (req, res) => {
  try {
    const { userId } = req.params;

    let wallet = await Wallet.findOne({ userId });
    
    // Create wallet if doesn't exist
    if (!wallet) {
      wallet = new Wallet({ userId, balance: 0 });
      await wallet.save();
    }

    res.json({ wallet });
  } catch (err) {
    logger.error('Get wallet error', { error: err.message });
    res.status(500).json({ error: 'Failed to get wallet' });
  }
};

/**
 * Top-up wallet (sandbox only)
 */
exports.topupWallet = async (req, res) => {
  try {
    const { userId, amount } = req.body;

    if (!userId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid userId and amount required' });
    }

    const wallet = await Wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: amount } },
      { upsert: true, new: true }
    );

    logger.info('Wallet topped up', { userId, amount, newBalance: wallet.balance });

    res.json({
      success: true,
      wallet,
      message: `Added ${amount} to wallet`
    });
  } catch (err) {
    logger.error('Topup wallet error', { error: err.message });
    res.status(500).json({ error: 'Failed to top up wallet' });
  }
};

/**
 * P2P Transfer (also creates Payment record if recipient is a merchant)
 */
exports.transfer = async (req, res) => {
  try {
    const { fromUserId, toUserId, amount, merchantId } = req.body;

    if (!fromUserId || !toUserId || !amount || amount <= 0) {
      return res.status(400).json({ error: 'Valid fromUserId, toUserId, and amount required' });
    }

    if (fromUserId === toUserId) {
      return res.status(400).json({ error: 'Cannot transfer to self' });
    }

    // Check sender balance
    const senderWallet = await Wallet.findOne({ userId: fromUserId });
    if (!senderWallet || senderWallet.balance < amount) {
      return res.status(402).json({ error: 'Insufficient funds' });
    }

    // Perform transfer
    senderWallet.balance -= amount;
    await senderWallet.save();

    const receiverWallet = await Wallet.findOneAndUpdate(
      { userId: toUserId },
      { $inc: { balance: amount } },
      { upsert: true, new: true }
    );

    // If merchantId is provided, create a Payment record for merchant dashboard tracking
    let paymentId = null;
    if (merchantId) {
      paymentId = generatePaymentId();
      const payment = new Payment({
        paymentId,
        merchantId,
        amount,
        currency: 'INR',
        status: PAYMENT_STATUS.COMPLETED,
        method: PAYMENT_METHOD.WALLET,
        payer: {
          userId: fromUserId
        },
        recipientId: toUserId,
        orderId: `transfer_${Date.now()}`,
        completedAt: new Date()
      });
      await payment.save();
      logger.info('Payment record created for transfer', { paymentId, merchantId, amount });
    }

    logger.info('P2P transfer completed', { fromUserId, toUserId, amount, merchantId, paymentId });

    res.json({
      success: true,
      message: 'Transfer completed',
      senderBalance: senderWallet.balance,
      receiverBalance: receiverWallet.balance,
      paymentId
    });
  } catch (err) {
    logger.error('Transfer error', { error: err.message });
    res.status(500).json({ error: 'Failed to transfer' });
  }
};
