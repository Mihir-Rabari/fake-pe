const logger = require('../utils/logger');

/**
 * Emit payment status update
 */
function emitPaymentUpdate(io, paymentId, data) {
  io.to(`payment:${paymentId}`).emit('payment:update', {
    paymentId,
    ...data,
    timestamp: new Date().toISOString()
  });
  logger.debug('Payment update emitted', { paymentId });
}

/**
 * Emit webhook delivery notification
 */
function emitWebhookDelivery(io, merchantId, data) {
  io.to(`merchant:${merchantId}`).emit('webhook:delivery', {
    ...data,
    timestamp: new Date().toISOString()
  });
  logger.debug('Webhook delivery emitted', { merchantId });
}

/**
 * Emit new payment alert to merchant
 */
function emitNewPayment(io, merchantId, payment) {
  io.to(`merchant:${merchantId}`).emit('payment:new', {
    payment,
    timestamp: new Date().toISOString()
  });
  logger.debug('New payment alert emitted', { merchantId, paymentId: payment.paymentId });
}

/**
 * Emit connection status
 */
function emitConnectionStatus(socket, status) {
  socket.emit('connection:status', {
    status,
    timestamp: new Date().toISOString()
  });
}

module.exports = {
  emitPaymentUpdate,
  emitWebhookDelivery,
  emitNewPayment,
  emitConnectionStatus
};
