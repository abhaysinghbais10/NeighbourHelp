require('dotenv').config();
const app = require('./src/app');
const { connectDB, disconnectDB } = require('./src/config/database');
const { connectRedis, disconnectRedis } = require('./src/config/redis');
const logger = require('./src/utils/logger');
const config = require('./src/config/environment');

let server;

// Handle Uncaught Exceptions
process.on('uncaughtException', (err) => {
  logger.error('UNCAUGHT EXCEPTION! App will continue running...');
  logger.error(err.name, err.message, err.stack);
  // process.exit(1); // Removed to prevent crash
});

const startServer = async () => {
  try {
    // 1. Connect to Database
    await connectDB();

    // 2. Connect to Redis (Optional)
    await connectRedis();

    // 3. Start Express server
    const PORT = config.node.port || 5000;
    server = app.listen(PORT, () => {
      logger.info(`Server running in ${config.node.env} mode on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  logger.error('UNHANDLED REJECTION! App will continue running...');
  logger.error(err.name, err.message, err.stack);
  // Do not crash the server on unhandled rejections
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully...');
  if (server) {
    server.close(async () => {
      logger.info('Process terminated!');
      await disconnectDB();
      await disconnectRedis();
      process.exit(0);
    });
  }
});
