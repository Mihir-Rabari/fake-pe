const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Create payment (idempotent)
router.post('/', paymentController.createPayment);

// Get payment by ID
router.get('/:paymentId', paymentController.getPayment);

// Get payment status
router.get('/:paymentId/status', paymentController.getPaymentStatus);

// Complete payment (customer action)
router.post('/:paymentId/complete', paymentController.completePayment);

// Confirm payment (merchant/admin)
router.post('/confirm', paymentController.confirmPayment);

// List payments (with filters)
router.get('/', paymentController.listPayments);

// Get payment history
router.get('/:paymentId/history', paymentController.getPaymentHistory);

// Refund payment
router.post('/:paymentId/refund', paymentController.refundPayment);

// Get payment webhooks
router.get('/:paymentId/webhooks', paymentController.getPaymentWebhooks);

module.exports = router;
