const mongoose = require('mongoose');

// Minimal Payment model for webhook service (read-only)
const PaymentSchema = new mongoose.Schema({
  paymentId: String,
  merchantId: String,
  orderId: String,
  amount: Number,
  currency: String,
  status: String,
  method: String,
  payer: String,
  completedAt: Date,
  metadata: mongoose.Schema.Types.Mixed
}, { collection: 'payments' });

module.exports = mongoose.model('Payment', PaymentSchema);
