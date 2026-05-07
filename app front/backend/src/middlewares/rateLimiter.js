/**
 * Rate Limiting Middleware
 * Different limiters for different route groups.
 */
const rateLimit = require('express-rate-limit');
const config = require('../config/environment');

// General API limiter
const apiLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many requests. Please try again later.',
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => config.node.isDevelopment, // Skip in development
});

// Strict limiter for auth routes (prevent brute force)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many login attempts. Please try again after 15 minutes.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Payment routes limiter
const paymentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    success: false,
    statusCode: 429,
    message: 'Too many payment requests. Please try again shortly.',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { apiLimiter, authLimiter, paymentLimiter };
