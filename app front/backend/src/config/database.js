/**
 * MongoDB Connection
 * Handles connection lifecycle with retry logic and event listeners.
 */
const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('./environment');

const RETRY_DELAY_MS = 5000;
const MAX_RETRIES = 5;

const mongooseOptions = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};

let retryCount = 0;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.db.uri, mongooseOptions);
    logger.info(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    retryCount = 0;

    mongoose.connection.on('error', (err) => {
      logger.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected. Attempting reconnect...');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

    return conn;
  } catch (error) {
    retryCount++;
    logger.error(`MongoDB connection failed (attempt ${retryCount}/${MAX_RETRIES}): ${error.message}`);

    if (retryCount < MAX_RETRIES) {
      logger.info(`Retrying in ${RETRY_DELAY_MS / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return connectDB();
    }

    logger.error('Max MongoDB connection retries reached. Exiting...');
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.connection.close();
    logger.info('MongoDB connection closed gracefully');
  } catch (error) {
    logger.error('Error closing MongoDB connection:', error);
  }
};

module.exports = { connectDB, disconnectDB };
