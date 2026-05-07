/**
 * Winston Logger
 * Structured logging with file rotation and console output.
 */
const { createLogger, format, transports } = require('winston');
const path = require('path');

const logDir = path.resolve(__dirname, '../../logs');

const logFormat = format.combine(
  format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  format.errors({ stack: true }),
  format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${stack || message}${metaStr}`;
  })
);

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: logFormat,
  defaultMeta: { service: 'phool-basket' },
  transports: [
    // Console — always active
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
    // Error log file
    new transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Combined log file
    new transports.File({
      filename: path.join(logDir, 'combined.log'),
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
  exitOnError: false,
});

// Stream for Morgan HTTP logging
logger.stream = {
  write: (message) => logger.info(message.trim()),
};

module.exports = logger;
