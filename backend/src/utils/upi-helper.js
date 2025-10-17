const crypto = require('crypto');

/**
 * UPI Helper Utilities
 * Inspired by UPI payment flows
 */

/**
 * Generate UPI deep link intent
 * Format: upi://pay?pa=PAYEE_VPA&pn=NAME&am=AMOUNT&tr=TXN_ID&tn=NOTE&cu=INR
 */
function generateUpiIntent(options) {
  const {
    payeeVpa,
    payeeName,
    amount,
    transactionId,
    transactionNote,
    merchantCode = 'FAKEPAY'
  } = options;

  const params = new URLSearchParams({
    pa: payeeVpa, // Payee VPA
    pn: payeeName, // Payee Name
    am: amount.toFixed(2), // Amount
    tr: transactionId, // Transaction ID
    tn: transactionNote || 'Payment', // Transaction Note
    cu: 'INR', // Currency
    mc: merchantCode // Merchant Code
  });

  return `upi://pay?${params.toString()}`;
}

/**
 * Generate UPI QR Code Data
 */
function generateUpiQrData(options) {
  return generateUpiIntent(options);
}

/**
 * Generate UTR (Unique Transaction Reference)
 * Format: YYMMDDHHMMSSNNNN (similar to real UPI UTR)
 */
function generateUtr() {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const second = String(now.getSeconds()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  
  return `${year}${month}${day}${hour}${minute}${second}${random}`;
}

/**
 * Validate UPI VPA format
 */
function validateVpa(vpa) {
  const vpaRegex = /^[a-z0-9._-]+@[a-z0-9]+$/i;
  return vpaRegex.test(vpa);
}

/**
 * Generate UPI transaction ID
 */
function generateUpiTxnId() {
  const timestamp = Date.now().toString(36);
  const random = crypto.randomBytes(4).toString('hex');
  return `UPI${timestamp}${random}`.toUpperCase();
}

/**
 * Parse UPI intent URL
 */
function parseUpiIntent(intentUrl) {
  try {
    const url = new URL(intentUrl);
    if (url.protocol !== 'upi:') {
      throw new Error('Invalid UPI intent URL');
    }

    const params = new URLSearchParams(url.search);
    return {
      payeeVpa: params.get('pa'),
      payeeName: params.get('pn'),
      amount: parseFloat(params.get('am')),
      transactionId: params.get('tr'),
      transactionNote: params.get('tn'),
      currency: params.get('cu'),
      merchantCode: params.get('mc')
    };
  } catch (err) {
    throw new Error('Failed to parse UPI intent');
  }
}

module.exports = {
  generateUpiIntent,
  generateUpiQrData,
  generateUtr,
  validateVpa,
  generateUpiTxnId,
  parseUpiIntent
};
