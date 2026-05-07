/**
 * Authentication & Authorization Middleware
 * JWT verification + role-based access control.
 */
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const config = require('../config/environment');

/**
 * Protect routes — requires valid JWT
 */
const authenticate = asyncHandler(async (req, _res, next) => {
  let token;

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  if (!token) {
    throw ApiError.unauthorized('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);

    const user = await User.findById(decoded.id).select('-password -refreshToken');
    if (!user) {
      throw ApiError.unauthorized('User associated with this token no longer exists.');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Your account has been deactivated. Contact support.');
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error.name === 'TokenExpiredError') {
      throw ApiError.unauthorized('Token has expired. Please login again.');
    }
    if (error.name === 'JsonWebTokenError') {
      throw ApiError.unauthorized('Invalid token.');
    }
    throw ApiError.unauthorized('Authentication failed.');
  }
});

/**
 * Authorize by role — must be used after authenticate
 * @param  {...string} roles - Allowed roles
 */
const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      throw ApiError.unauthorized('Authentication required.');
    }

    if (!roles.includes(req.user.role)) {
      throw ApiError.forbidden(
        `Role '${req.user.role}' is not authorized to access this resource.`
      );
    }

    next();
  };
};

/**
 * Optional auth — attaches user if token present, continues regardless
 */
const optionalAuth = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = await User.findById(decoded.id).select('-password -refreshToken');
    } catch {
      // Silently continue without user
    }
  }
  next();
});

module.exports = { authenticate, authorize, optionalAuth };
