const { nanoid } = require('nanoid');

/**
 * Generate unique payment ID
 * @returns {string} Payment ID with 'pay_' prefix
 */
function generatePaymentId() {
  return `pay_${nanoid(16)}`;
}

/**
 * Generate unique merchant ID
 * @returns {string} Merchant ID with 'mer_' prefix
 */
function generateMerchantId() {
  return `mer_${nanoid(16)}`;
}

/**
 * Generate unique user ID
 * @returns {string} User ID with 'usr_' prefix
 */
function generateUserId() {
  return `usr_${nanoid(16)}`;
}

/**
 * Generate unique webhook attempt ID
 * @returns {string} Attempt ID with 'wha_' prefix
 */
function generateWebhookAttemptId() {
  return `wha_${nanoid(16)}`;
}

/**
 * Generate unique backup ID
 * @returns {string} Backup ID with 'bak_' prefix
 */
function generateBackupId() {
  return `bak_${nanoid(16)}`;
}

/**
 * Generate unique project ID
 * @returns {string} Project ID with 'prj_' prefix
 */
function generateProjectId() {
  return `prj_${nanoid(16)}`;
}

/**
 * Generate unique API key ID
 * @returns {string} Key ID with 'key_' prefix
 */
function generateKeyId() {
  return `key_${nanoid(16)}`;
}

/**
 * Generate short alphanumeric code
 * @param {number} length - Length of code
 * @returns {string} Alphanumeric code
 */
function generateCode(length = 6) {
  return nanoid(length);
}

module.exports = {
  generatePaymentId,
  generateMerchantId,
  generateUserId,
  generateWebhookAttemptId,
  generateBackupId,
  generateProjectId,
  generateKeyId,
  generateCode
};
