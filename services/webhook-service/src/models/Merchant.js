const mongoose = require('mongoose');

// Minimal Merchant model for webhook service (read-only)
const MerchantSchema = new mongoose.Schema({
  merchantId: String,
  name: String,
  secret: String,
  webhookUrl: String
}, { collection: 'merchants' });

module.exports = mongoose.model('Merchant', MerchantSchema);
