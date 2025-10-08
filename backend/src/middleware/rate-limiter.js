const { RATE_LIMIT, REDIS_PREFIX } = require('../utils/constants');
const logger = require('../utils/logger');

/**
 * Redis-based rate limiter middleware
 * @param {Object} redis - Redis client
 * @returns {Function} Express middleware
 */
function rateLimiter(redis) {
  return async (req, res, next) => {
    try {
      // Get identifier (user ID, merchant ID, or IP)
      const identifier = req.user?.userId || 
                        req.user?.merchantId || 
                        req.ip || 
                        'anonymous';
      
      // Determine rate limit config based on endpoint
      let config = RATE_LIMIT.API_GENERAL;
      if (req.path.includes('/payments') && req.method === 'POST') {
        config = RATE_LIMIT.CREATE_PAYMENT;
      } else if (req.path.includes('/webhook')) {
        config = RATE_LIMIT.WEBHOOK;
      }

      const window = Math.floor(Date.now() / config.windowMs);
      const key = `${REDIS_PREFIX.RATE_LIMIT}${identifier}:${window}`;

      // Increment counter
      const current = await redis.incr(key);
      
      // Set expiry on first request in window
      if (current === 1) {
        await redis.pexpire(key, config.windowMs);
      }

      // Check if limit exceeded
      if (current > config.max) {
        logger.warn('Rate limit exceeded', {
          identifier,
          path: req.path,
          current,
          max: config.max
        });

        return res.status(429).json({
          error: 'Too many requests',
          retryAfter: Math.ceil(config.windowMs / 1000)
        });
      }

      // Add rate limit headers
      res.setHeader('X-RateLimit-Limit', config.max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, config.max - current));
      res.setHeader('X-RateLimit-Reset', Date.now() + config.windowMs);

      next();
    } catch (err) {
      logger.error('Rate limiter error', { error: err.message });
      // Fail open - don't block request on rate limiter error
      next();
    }
  };
}

module.exports = rateLimiter;
