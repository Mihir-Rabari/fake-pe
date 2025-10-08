require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const socketio = require('socket.io');
const Redis = require('ioredis');
const mongoose = require('mongoose');
const { register } = require('prom-client');

const logger = require('./utils/logger');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    credentials: true
  }
});

// Configuration
const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URL = process.env.REDIS_URL;

// Redis client
const redis = new Redis(REDIS_URL, {
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  }
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
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true
}));
app.use(morgan('combined', { stream: { write: msg => logger.info(msg.trim()) } }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make io and redis available to routes
app.set('io', io);
app.set('redis', redis);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'fakepay-backend',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Import routes
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payments');
const walletRoutes = require('./routes/wallets');
const merchantRoutes = require('./routes/merchants');
const projectRoutes = require('./routes/projects');
const webhookRoutes = require('./routes/webhooks');
const adminRoutes = require('./routes/admin');

// Mount routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/wallets', walletRoutes);
app.use('/api/v1/merchants', merchantRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/webhooks', webhookRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message, stack: err.stack });
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Start webhook worker
require('./workers/webhook-worker');

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 FakePay Backend running on port ${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Server closed');
    mongoose.connection.close(false, () => {
      logger.info('MongoDB connection closed');
      redis.quit(() => {
        logger.info('Redis connection closed');
        process.exit(0);
      });
    });
  });
});

module.exports = { app, server, io, redis };
