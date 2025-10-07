const { LOCK_CONFIG } = require('../constants');

/**
 * Acquire distributed lock using Redis
 * @param {Object} redis - Redis client
 * @param {string} key - Lock key
 * @param {number} ttl - Time to live in milliseconds
 * @returns {Promise<string|null>} Lock value if acquired, null otherwise
 */
async function acquireLock(redis, key, ttl = LOCK_CONFIG.TTL_MS) {
  const value = `${process.pid}-${Date.now()}-${Math.random()}`;
  const result = await redis.set(key, value, 'PX', ttl, 'NX');
  return result === 'OK' ? value : null;
}

/**
 * Release distributed lock
 * @param {Object} redis - Redis client
 * @param {string} key - Lock key
 * @param {string} value - Lock value (must match)
 * @returns {Promise<number>} 1 if released, 0 otherwise
 */
async function releaseLock(redis, key, value) {
  const luaScript = `
    if redis.call('get', KEYS[1]) == ARGV[1] then
      return redis.call('del', KEYS[1])
    else
      return 0
    end
  `;
  return await redis.eval(luaScript, 1, key, value);
}

/**
 * Acquire lock with retries
 * @param {Object} redis - Redis client
 * @param {string} key - Lock key
 * @param {number} ttl - Time to live in milliseconds
 * @param {number} maxRetries - Maximum retry attempts
 * @param {number} retryDelay - Delay between retries in milliseconds
 * @returns {Promise<string|null>} Lock value if acquired, null otherwise
 */
async function acquireLockWithRetry(
  redis,
  key,
  ttl = LOCK_CONFIG.TTL_MS,
  maxRetries = LOCK_CONFIG.MAX_RETRIES,
  retryDelay = LOCK_CONFIG.RETRY_DELAY_MS
) {
  for (let i = 0; i < maxRetries; i++) {
    const lockValue = await acquireLock(redis, key, ttl);
    if (lockValue) {
      return lockValue;
    }
    if (i < maxRetries - 1) {
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
  return null;
}

/**
 * Execute function with lock
 * @param {Object} redis - Redis client
 * @param {string} key - Lock key
 * @param {Function} fn - Function to execute
 * @param {number} ttl - Lock TTL in milliseconds
 * @returns {Promise<any>} Result of function execution
 * @throws {Error} If lock cannot be acquired
 */
async function withLock(redis, key, fn, ttl = LOCK_CONFIG.TTL_MS) {
  const lockValue = await acquireLockWithRetry(redis, key, ttl);
  if (!lockValue) {
    throw new Error(`Failed to acquire lock: ${key}`);
  }

  try {
    return await fn();
  } finally {
    await releaseLock(redis, key, lockValue);
  }
}

/**
 * Check if lock exists
 * @param {Object} redis - Redis client
 * @param {string} key - Lock key
 * @returns {Promise<boolean>} True if lock exists
 */
async function isLocked(redis, key) {
  const value = await redis.get(key);
  return value !== null;
}

module.exports = {
  acquireLock,
  releaseLock,
  acquireLockWithRetry,
  withLock,
  isLocked
};
