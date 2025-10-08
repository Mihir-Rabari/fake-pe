const Wallet = require('../models/Wallet');
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
 * P2P Transfer
 */
exports.transfer = async (req, res) => {
  try {
    const { fromUserId, toUserId, amount } = req.body;

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

    logger.info('P2P transfer completed', { fromUserId, toUserId, amount });

    res.json({
      success: true,
      message: 'Transfer completed',
      senderBalance: senderWallet.balance,
      receiverBalance: receiverWallet.balance
    });
  } catch (err) {
    logger.error('Transfer error', { error: err.message });
    res.status(500).json({ error: 'Failed to transfer' });
  }
};
