const crypto = require('crypto');

/**
 * Generate HMAC SHA256 signature
 * @param {string} secret - Secret key
 * @param {string} data - Data to sign
 * @returns {string} Hex signature
 */
function generateHmacSignature(secret, data) {
  return crypto
    .createHmac('sha256', secret)
    .update(data)
    .digest('hex');
}

/**
 * Verify HMAC SHA256 signature
 * @param {string} secret - Secret key
 * @param {string} data - Data that was signed
 * @param {string} signature - Signature to verify
 * @returns {boolean} True if valid
 */
function verifyHmacSignature(secret, data, signature) {
  const expected = generateHmacSignature(secret, data);
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expected)
  );
}

/**
 * Generate random secret key
 * @param {number} length - Length in bytes (default 32)
 * @returns {string} Hex string
 */
function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

/**
 * Hash password using bcrypt-compatible method
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
async function hashPassword(password) {
  const bcrypt = require('bcryptjs');
  return bcrypt.hash(password, 10);
}

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} True if match
 */
async function comparePassword(password, hash) {
  const bcrypt = require('bcryptjs');
  return bcrypt.compare(password, hash);
}

/**
 * Generate API key with prefix
 * @param {string} prefix - Key prefix (e.g., 'sk_test', 'sk_live')
 * @returns {string} API key
 */
function generateApiKey(prefix = 'sk_test') {
  const random = crypto.randomBytes(24).toString('base64')
    .replace(/\+/g, '')
    .replace(/\//g, '')
    .replace(/=/g, '');
  return `${prefix}_${random}`;
}

module.exports = {
  generateHmacSignature,
  verifyHmacSignature,
  generateSecret,
  hashPassword,
  comparePassword,
  generateApiKey
};
