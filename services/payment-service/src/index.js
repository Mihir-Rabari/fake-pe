require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const logger = require('./utils/logger');
const paymentRoutes = require('./routes/payments');
const walletRoutes = require('./routes/wallets');
const adminRoutes = require('./routes/admin');
const { register } = require('prom-client');

const app = express();
const PORT = process.env.PORT || 4002;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URL = process.env.REDIS_URL;

// Redis client
const redis = new Redis(REDIS_URL, {
  retryStrategy: (times) => Math.min(times * 50, 2000)
});

redis.on('connect', () => logger.info('Redis connected'));
redis.on('error', (err) => logger.error('Redis error:', err));

// MongoDB connection
mongoose.connect(MONGO_URI, {
  serverSelectionTimeoutMS: 5000
})
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make redis available to routes
app.set('redis', redis);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'payment-service',
    timestamp: new Date().toISOString()
  });
});

// Metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Routes
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/wallets', walletRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  logger.info(`💳 Payment Service running on port ${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down');
  mongoose.connection.close(false, () => {
    redis.quit(() => {
      process.exit(0);
    });
  });
});

module.exports = app;
