const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

/**
 * Authentication middleware
 * Verifies JWT token from Authorization header or API key
 */
async function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'No authorization header' });
    }

    // Check for Bearer token
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        return next();
      } catch (err) {
        logger.warn('Invalid JWT token', { error: err.message });
        return res.status(401).json({ error: 'Invalid token' });
      }
    }

    // Check for API key
    if (authHeader.startsWith('sk_')) {
      // API key authentication - forward to merchant service for validation
      // For now, we'll just pass it through and let the service handle it
      req.apiKey = authHeader;
      return next();
    }

    return res.status(401).json({ error: 'Invalid authorization format' });
  } catch (err) {
    logger.error('Auth middleware error', { error: err.message });
    return res.status(500).json({ error: 'Internal server error' });
  }
}

/**
 * Optional auth middleware - doesn't fail if no token
 */
async function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.substring(7);
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      // Ignore invalid token for optional auth
      logger.debug('Optional auth: invalid token', { error: err.message });
    }
  }
  
  next();
}

module.exports = authMiddleware;
module.exports.optionalAuth = optionalAuth;
