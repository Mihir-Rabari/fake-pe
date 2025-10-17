const crypto = require('crypto');

/**
 * Webhook Signature Utilities (Similar to Razorpay)
 * Provides HMAC-based signature verification for webhooks
 */

/**
 * Generate webhook signature
 * @param {Object} payload - Webhook payload
 * @param {string} secret - Webhook secret key
 * @returns {string} HMAC SHA256 signature
 */
function generateSignature(payload, secret) {
  const payloadString = typeof payload === 'string' 
    ? payload 
    : JSON.stringify(payload);
  
  return crypto
    .createHmac('sha256', secret)
    .update(payloadString)
    .digest('hex');
}

/**
 * Verify webhook signature
 * @param {Object} payload - Webhook payload
 * @param {string} signature - Received signature
 * @param {string} secret - Webhook secret key
 * @returns {boolean} True if signature is valid
 */
function verifySignature(payload, signature, secret) {
  const expectedSignature = generateSignature(payload, secret);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}

/**
 * Generate webhook payload with signature
 * @param {Object} data - Event data
 * @param {string} event - Event type
 * @param {string} secret - Webhook secret
 * @returns {Object} Payload with signature
 */
function createWebhookPayload(data, event, secret) {
  const payload = {
    event,
    data,
    created_at: Math.floor(Date.now() / 1000)
  };

  const signature = generateSignature(payload, secret);

  return {
    payload,
    signature,
    headers: {
      'X-FakePay-Signature': signature,
      'X-FakePay-Event': event
    }
  };
}

/**
 * Verify webhook request
 * @param {Object} body - Request body
 * @param {string} signature - Signature from headers
 * @param {string} secret - Webhook secret
 * @returns {boolean} True if request is authentic
 */
function verifyWebhookRequest(body, signature, secret) {
  if (!signature) {
    return false;
  }

  try {
    return verifySignature(body, signature, secret);
  } catch (err) {
    return false;
  }
}

module.exports = {
  generateSignature,
  verifySignature,
  createWebhookPayload,
  verifyWebhookRequest
};
