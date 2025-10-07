require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Redis = require('ioredis');
const logger = require('./utils/logger');

const app = express();
const PORT = process.env.PORT || 4003;
const MONGO_URI = process.env.MONGO_URI;
const REDIS_URL = process.env.REDIS_URL;

// Redis client
const redis = new Redis(REDIS_URL);

// MongoDB connection
mongoose.connect(MONGO_URI)
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.set('redis', redis);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'merchant-service',
    timestamp: new Date().toISOString()
  });
});

// Routes
const merchantRoutes = require('./routes/merchants');
const projectRoutes = require('./routes/projects');

app.use('/api/v1/merchants', merchantRoutes);
app.use('/api/v1/projects', projectRoutes);

// Error handler
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  logger.info(`🏢 Merchant Service running on port ${PORT}`);
});

module.exports = app;
