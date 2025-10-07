/**
 * Type definitions for Expe Payment Gateway
 * These are JSDoc types for better IDE support
 */

/**
 * @typedef {Object} Merchant
 * @property {string} merchantId - Unique merchant identifier
 * @property {string} name - Merchant name
 * @property {string} email - Merchant email
 * @property {string} secret - HMAC secret for webhook signing
 * @property {string} [webhookUrl] - Default webhook URL
 * @property {boolean} isActive - Whether merchant is active
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 */

/**
 * @typedef {Object} Payment
 * @property {string} paymentId - Unique payment identifier
 * @property {string} merchantId - Associated merchant ID
 * @property {string} orderId - Merchant's order ID
 * @property {number} amount - Payment amount
 * @property {string} currency - Currency code (INR, USD)
 * @property {string} status - Payment status (CREATED, PENDING, COMPLETED, FAILED, REFUNDED)
 * @property {string} [method] - Payment method used
 * @property {string} [payer] - User ID of payer
 * @property {string} [recipientId] - Recipient ID for P2P
 * @property {string} [callbackUrl] - Webhook callback URL
 * @property {Object} [metadata] - Additional metadata
 * @property {string} [idempotencyKey] - Idempotency key
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} [updatedAt] - Last update timestamp
 * @property {Date} [completedAt] - Completion timestamp
 */

/**
 * @typedef {Object} Wallet
 * @property {string} userId - User ID
 * @property {number} balance - Current balance
 * @property {string} currency - Currency code
 * @property {Date} updatedAt - Last update timestamp
 */

/**
 * @typedef {Object} User
 * @property {string} userId - Unique user identifier
 * @property {string} email - User email
 * @property {string} password - Hashed password
 * @property {string} name - User name
 * @property {string} role - User role (user, merchant, admin)
 * @property {boolean} isVerified - Email verification status
 * @property {Date} createdAt - Creation timestamp
 */

/**
 * @typedef {Object} WebhookAttempt
 * @property {string} attemptId - Unique attempt identifier
 * @property {string} paymentId - Associated payment ID
 * @property {string} callbackUrl - Webhook URL
 * @property {string} status - Attempt status
 * @property {number} attempts - Number of attempts made
 * @property {Date} [nextRunAt] - Next retry time
 * @property {string} [lastError] - Last error message
 * @property {Date} [deliveredAt] - Delivery timestamp
 * @property {Date} createdAt - Creation timestamp
 */

/**
 * @typedef {Object} PaymentBackup
 * @property {string} backupId - Unique backup identifier
 * @property {string} paymentId - Associated payment ID
 * @property {Object} snapshot - Payment state snapshot
 * @property {string} reason - Reason for backup
 * @property {Date} createdAt - Creation timestamp
 */

/**
 * @typedef {Object} ApiKey
 * @property {string} keyId - Unique key identifier
 * @property {string} merchantId - Associated merchant ID
 * @property {string} projectId - Associated project ID
 * @property {string} key - The actual API key
 * @property {string} type - Key type (test, live)
 * @property {boolean} isActive - Whether key is active
 * @property {Date} createdAt - Creation timestamp
 * @property {Date} [lastUsedAt] - Last usage timestamp
 */

/**
 * @typedef {Object} Project
 * @property {string} projectId - Unique project identifier
 * @property {string} merchantId - Associated merchant ID
 * @property {string} name - Project name
 * @property {string} description - Project description
 * @property {string} webhookUrl - Webhook URL for this project
 * @property {string[]} allowedOrigins - Allowed CORS origins
 * @property {boolean} isActive - Whether project is active
 * @property {Date} createdAt - Creation timestamp
 */

module.exports = {};
