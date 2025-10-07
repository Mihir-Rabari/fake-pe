const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { hashPassword, comparePassword } = require('@expe/shared');
const { generateUserId, generateMerchantId } = require('@expe/shared');
const logger = require('../utils/logger');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_in_production';
const JWT_EXPIRY = process.env.JWT_EXPIRY || '24h';

/**
 * Generate JWT token
 */
function generateToken(user) {
  return jwt.sign(
    {
      userId: user.userId,
      email: user.email,
      role: user.role,
      merchantId: user.merchantId
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRY }
  );
}

/**
 * Register new user
 */
exports.register = async (req, res) => {
  try {
    const { email, password, name, role } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Generate user ID
    const userId = generateUserId();

    // Generate merchant ID if role is merchant
    const merchantId = role === 'merchant' ? generateMerchantId() : null;

    // Create user
    const user = new User({
      userId,
      email,
      password: hashedPassword,
      name,
      role: role || 'user',
      merchantId,
      isVerified: false
    });

    await user.save();

    logger.info('User registered', { userId, email, role });

    // Generate token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
      token
    });
  } catch (err) {
    logger.error('Registration error', { error: err.message });
    res.status(500).json({ error: 'Registration failed' });
  }
};

/**
 * Login user
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    logger.info('User logged in', { userId: user.userId, email });

    // Generate token
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      user: user.toJSON(),
      token
    });
  } catch (err) {
    logger.error('Login error', { error: err.message });
    res.status(500).json({ error: 'Login failed' });
  }
};

/**
 * Refresh token
 */
exports.refreshToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: 'Token required' });
    }

    // Verify old token (ignore expiration)
    const decoded = jwt.verify(token, JWT_SECRET, { ignoreExpiration: true });

    // Find user
    const user = await User.findOne({ userId: decoded.userId, isActive: true });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Generate new token
    const newToken = generateToken(user);

    res.json({
      message: 'Token refreshed',
      token: newToken
    });
  } catch (err) {
    logger.error('Token refresh error', { error: err.message });
    res.status(401).json({ error: 'Invalid token' });
  }
};

/**
 * Logout user
 */
exports.logout = async (req, res) => {
  try {
    // In a stateless JWT system, logout is handled client-side
    // But we can blacklist the token in Redis if needed
    res.json({ message: 'Logged out successfully' });
  } catch (err) {
    logger.error('Logout error', { error: err.message });
    res.status(500).json({ error: 'Logout failed' });
  }
};

/**
 * Verify email
 */
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Update user
    const user = await User.findOneAndUpdate(
      { userId: decoded.userId },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info('Email verified', { userId: user.userId });

    res.json({
      message: 'Email verified successfully',
      user: user.toJSON()
    });
  } catch (err) {
    logger.error('Email verification error', { error: err.message });
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Request password reset
 */
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email, isActive: true });
    if (!user) {
      // Don't reveal if user exists
      return res.json({ message: 'If email exists, reset link will be sent' });
    }

    // Generate reset token
    const resetToken = jwt.sign(
      { userId: user.userId, purpose: 'password-reset' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    logger.info('Password reset requested', { userId: user.userId, email });

    // In production, send email with reset link
    // For now, return token
    res.json({
      message: 'Password reset link sent',
      resetToken // Remove in production
    });
  } catch (err) {
    logger.error('Forgot password error', { error: err.message });
    res.status(500).json({ error: 'Request failed' });
  }
};

/**
 * Reset password
 */
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.purpose !== 'password-reset') {
      return res.status(400).json({ error: 'Invalid token' });
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update user
    const user = await User.findOneAndUpdate(
      { userId: decoded.userId },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    logger.info('Password reset', { userId: user.userId });

    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    logger.error('Password reset error', { error: err.message });
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};

/**
 * Get current user
 */
exports.getCurrentUser = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findOne({ userId: decoded.userId, isActive: true });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: user.toJSON() });
  } catch (err) {
    logger.error('Get current user error', { error: err.message });
    res.status(401).json({ error: 'Invalid token' });
  }
};
