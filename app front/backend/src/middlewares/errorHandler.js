/**
 * Global Error Handler Middleware
 * Catches all errors and returns consistent JSON responses.
 * Distinguishes operational errors from programming bugs.
 */
const ApiError = require('../utils/ApiError');
const logger = require('../utils/logger');
const config = require('../config/environment');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, _req, res, _next) => {
  let error = { ...err, message: err.message, stack: err.stack };

  // Log full error in development, summary in production
  if (config.node.isDevelopment) {
    logger.error(err);
  } else {
    logger.error(`${err.statusCode || 500} - ${err.message}`);
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    error = new ApiError(400, `Invalid ${err.path}: ${err.value}`);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0];
    const value = err.keyValue ? err.keyValue[field] : 'unknown';
    error = new ApiError(409, `'${value}' already exists for '${field}'`);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    error = new ApiError(400, 'Validation failed', messages);
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError(401, 'Invalid token');
  }
  if (err.name === 'TokenExpiredError') {
    error = new ApiError(401, 'Token has expired');
  }

  // Multer file size error
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new ApiError(400, 'File too large. Maximum size is 5MB.');
  }
  if (err.code === 'LIMIT_FILE_COUNT') {
    error = new ApiError(400, 'Too many files uploaded.');
  }

  // Multer unexpected field
  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = new ApiError(400, 'Unexpected file field.');
  }

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : 'Internal server error';

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: error.errors || [],
    ...(config.node.isDevelopment && { stack: error.stack }),
  });
};

module.exports = errorHandler;
