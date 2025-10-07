const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';

/**
 * WebSocket authentication and room management
 * @param {Object} io - Socket.io instance
 * @param {Object} redis - Redis client
 */
function setupSocketAuth(io, redis) {
  // Authentication middleware
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    
    if (!token) {
      return next(new Error('Authentication required'));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      socket.userId = decoded.userId;
      socket.merchantId = decoded.merchantId;
      socket.role = decoded.role;
      next();
    } catch (err) {
      logger.warn('Socket auth failed', { error: err.message });
      next(new Error('Invalid token'));
    }
  });

  // Connection handler
  io.on('connection', (socket) => {
    logger.info('Socket connected', {
      socketId: socket.id,
      userId: socket.userId,
      merchantId: socket.merchantId
    });

    // Join user-specific room
    socket.join(`user:${socket.userId}`);

    // Join merchant room if merchant
    if (socket.merchantId) {
      socket.join(`merchant:${socket.merchantId}`);
    }

    // Subscribe to payment updates
    socket.on('subscribe:payment', (paymentId) => {
      logger.debug('Subscribing to payment', { paymentId, userId: socket.userId });
      socket.join(`payment:${paymentId}`);
    });

    // Unsubscribe from payment updates
    socket.on('unsubscribe:payment', (paymentId) => {
      logger.debug('Unsubscribing from payment', { paymentId, userId: socket.userId });
      socket.leave(`payment:${paymentId}`);
    });

    // Disconnect handler
    socket.on('disconnect', (reason) => {
      logger.info('Socket disconnected', {
        socketId: socket.id,
        userId: socket.userId,
        reason
      });
    });

    // Error handler
    socket.on('error', (err) => {
      logger.error('Socket error', {
        socketId: socket.id,
        userId: socket.userId,
        error: err.message
      });
    });
  });

  return io;
}

module.exports = setupSocketAuth;
