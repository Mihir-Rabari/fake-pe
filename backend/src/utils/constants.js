// Payment statuses
const PAYMENT_STATUS = {
  CREATED: 'CREATED',
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  REFUNDED: 'REFUNDED'
};

// Payment methods
const PAYMENT_METHOD = {
  WALLET: 'wallet',
  CARD: 'card',
  UPI: 'upi',
  NET_BANKING: 'netbanking'
};

// Webhook attempt statuses
const WEBHOOK_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  DELIVERED: 'DELIVERED',
  FAILED: 'FAILED',
  RETRY: 'RETRY'
};

// User roles
const USER_ROLE = {
  USER: 'user',
  MERCHANT: 'merchant',
  ADMIN: 'admin'
};

// API Key types
const API_KEY_TYPE = {
  TEST: 'test',
  LIVE: 'live'
};

// Currency
const CURRENCY = {
  INR: 'INR',
  USD: 'USD'
};

// Redis key prefixes
const REDIS_PREFIX = {
  LOCK_PAYMENT: 'lock:payment:',
  QUEUE_WEBHOOK: 'queue:webhooks',
  SCHEDULED_WEBHOOK: 'z:webhooks:scheduled',
  PROCESSING_WEBHOOK: 'processing:webhooks',
  CACHE_PAYMENT_QR: 'cache:paymentQR:',
  IDEMPOTENCY: 'idem:',
  RATE_LIMIT: 'ratelimit:',
  SESSION: 'session:'
};

// Rate limiting
const RATE_LIMIT = {
  CREATE_PAYMENT: {
    windowMs: 60000, // 1 minute
    max: 100 // 100 requests per minute
  },
  API_GENERAL: {
    windowMs: 60000,
    max: 300
  },
  WEBHOOK: {
    windowMs: 60000,
    max: 50
  }
};

// Webhook retry configuration
const WEBHOOK_CONFIG = {
  MAX_ATTEMPTS: 10,
  BASE_BACKOFF_MS: 1000,
  MAX_BACKOFF_MS: 3600000, // 1 hour
  TIMEOUT_MS: 30000 // 30 seconds
};

// Lock configuration
const LOCK_CONFIG = {
  TTL_MS: 10000, // 10 seconds
  RETRY_DELAY_MS: 100,
  MAX_RETRIES: 3
};

// Idempotency
const IDEMPOTENCY_TTL_HOURS = 24;

module.exports = {
  PAYMENT_STATUS,
  PAYMENT_METHOD,
  WEBHOOK_STATUS,
  USER_ROLE,
  API_KEY_TYPE,
  CURRENCY,
  REDIS_PREFIX,
  RATE_LIMIT,
  WEBHOOK_CONFIG,
  LOCK_CONFIG,
  IDEMPOTENCY_TTL_HOURS
};
