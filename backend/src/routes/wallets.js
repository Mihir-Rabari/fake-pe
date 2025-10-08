const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');

// Get wallet balance
router.get('/:userId', walletController.getWallet);

// Top-up wallet (sandbox)
router.post('/topup', walletController.topupWallet);

// Transfer (P2P)
router.post('/transfer', walletController.transfer);

module.exports = router;
