const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validate } = require('../middleware/validator');
const { registerSchema, loginSchema } = require('../validators/authSchemas');

// Register new user
router.post('/register', validate(registerSchema), authController.register);

// Login
router.post('/login', validate(loginSchema), authController.login);

// Refresh token
router.post('/refresh', authController.refreshToken);

// Logout
router.post('/logout', authController.logout);

// Verify email
router.post('/verify-email', authController.verifyEmail);

// Request password reset
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.post('/reset-password', authController.resetPassword);

// Get current user (requires auth token in header)
router.get('/me', authController.getCurrentUser);

module.exports = router;
