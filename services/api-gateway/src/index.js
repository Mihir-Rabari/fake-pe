require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { createProxyMiddleware } = require('http-proxy-middleware');
const socketio = require('socket.io');
const Redis = require('ioredis');
const mongoose = require('mongoose');
const { register } = require('prom-client');

const logger = require('./utils/logger');
const rateLimiter = require('./middleware/rate-limiter');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error-handler');
const metricsMiddleware = require('./middleware/metrics');
const socketAuth = require('./socket/auth');

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

// Metrics middleware
app.use(metricsMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'api-gateway',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Rate limiting
app.use('/api', rateLimiter(redis));

// Service proxies with authentication
const authServiceUrl = process.env.AUTH_SERVICE_URL || 'http://localhost:4001';
const paymentServiceUrl = process.env.PAYMENT_SERVICE_URL || 'http://localhost:4002';
const merchantServiceUrl = process.env.MERCHANT_SERVICE_URL || 'http://localhost:4003';

// Auth service routes (no auth required for login/register)
app.use('/api/v1/auth', createProxyMiddleware({
  target: authServiceUrl,
  changeOrigin: true,
  pathRewrite: { '^/api/v1/auth': '/api/v1/auth' }
}));

// Payment service routes (auth required)
app.use('/api/v1/payments', 
  authMiddleware,
  createProxyMiddleware({
    target: paymentServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/payments': '/api/v1/payments' },
    onProxyReq: (proxyReq, req) => {
      // Forward user info to payment service
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
        proxyReq.setHeader('X-Merchant-Id', req.user.merchantId || '');
      }
    }
  })
);

// Wallet routes (auth required)
app.use('/api/v1/wallets',
  authMiddleware,
  createProxyMiddleware({
    target: paymentServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/wallets': '/api/v1/wallets' },
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
      }
    }
  })
);

// Merchant service routes (auth required)
app.use('/api/v1/merchants',
  authMiddleware,
  createProxyMiddleware({
    target: merchantServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/merchants': '/api/v1/merchants' },
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
        proxyReq.setHeader('X-Merchant-Id', req.user.merchantId || '');
      }
    }
  })
);

// Projects and API keys (auth required)
app.use('/api/v1/projects',
  authMiddleware,
  createProxyMiddleware({
    target: merchantServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/projects': '/api/v1/projects' },
    onProxyReq: (proxyReq, req) => {
      if (req.user) {
        proxyReq.setHeader('X-User-Id', req.user.userId);
        proxyReq.setHeader('X-Merchant-Id', req.user.merchantId || '');
      }
    }
  })
);

// Admin routes (admin auth required)
app.use('/api/v1/admin',
  authMiddleware,
  (req, res, next) => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Admin access required' });
    }
    next();
  },
  createProxyMiddleware({
    target: paymentServiceUrl,
    changeOrigin: true,
    pathRewrite: { '^/api/v1/admin': '/api/v1/admin' }
  })
);

// WebSocket setup
socketAuth(io, redis);

// Make io and redis available to other modules
app.set('io', io);
app.set('redis', redis);

// Error handling
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path
  });
});

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 API Gateway running on port ${PORT}`);
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
