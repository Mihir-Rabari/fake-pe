const express = require('express');
const router = express.Router();
const upiController = require('../controllers/upiController');

// VPA management
router.post('/vpa', upiController.createVpa);
router.get('/vpa/:userId', upiController.getUserVpas);

// UPI payments
router.post('/initiate', upiController.initiateUpiPayment);
router.post('/confirm', upiController.confirmUpiPayment);
router.get('/transaction/:txnId', upiController.getUpiTransaction);
router.get('/history/:userId', upiController.getUpiTransactionHistory);

// UPI QR & Intent
router.get('/qr/:paymentId', upiController.generateUpiQr);

module.exports = router;
