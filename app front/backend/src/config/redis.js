const Redis = require('ioredis');
const logger = require('../utils/logger');
const config = require('./environment');

let client = null;

const getRedisClient = () => {
  if (client) return client;
  const useRedis = process.env.USE_REDIS === 'true';

  let client = null;

  if (useRedis) {
    const Redis = require('ioredis');

    client = new Redis({
      host: '127.0.0.1',
      port: 6379,
    });

    client.on('error', (err) => {
      console.log('Redis error:', err.message);
    });

  } else {
    console.log('Redis disabled');
  }

  const getRedisClient = () => client;

  module.exports = { getRedisClient };
  const redisConfig = {
    host: config.redis.host || '127.0.0.1',
    port: config.redis.port || 6379,
    retryStrategy: (times) => {
      // Don't crash, just stop retrying after a few attempts
      if (times > 5) {
        logger.error('Redis: max retries reached, giving up. App will continue running without Redis.');
        return null; // stop retrying
      }
      const delay = Math.min(times * 200, 3000);
      logger.warn(`Redis: retrying connection in ${delay}ms (attempt ${times})`);
      return delay;
    },
    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    lazyConnect: true, // Don't try to connect until we explicitly call .connect()
  };

  if (config.redis.password) {
    redisConfig.password = config.redis.password;
  }

  try {
    client = new Redis(redisConfig);

    client.on('connect', () => logger.info('Redis: connecting...'));
    client.on('ready', () => logger.info('Redis: ready'));

    // SAFE ERROR HANDLING - No process.exit(1)
    client.on('error', (err) => {
      logger.error('Redis error:', err.message);
      // We strictly log the error without killing the process
    });

    client.on('close', () => logger.warn('Redis: connection closed'));
    client.on('reconnecting', (ms) => logger.info(`Redis: reconnecting in ${ms}ms`));
  } catch (err) {
    logger.error('Failed to initialize Redis client:', err.message);
  }

  return client;
};

const connectRedis = async () => {
  try {
    const redisClient = getRedisClient();
    if (redisClient) {
      await redisClient.connect();
    }
    return redisClient;
  } catch (error) {
    // If Redis fails to connect, log the error but allow the app to boot
    logger.warn(`Redis connection failed: ${error.message}. App is running without Redis cache.`);
    return null;
  }
};

const disconnectRedis = async () => {
  if (client) {
    try {
      await client.quit();
      logger.info('Redis connection closed gracefully');
      client = null;
    } catch (error) {
      logger.error('Error closing Redis connection:', error.message);
      client = null;
    }
  }
};

module.exports = { getRedisClient, connectRedis, disconnectRedis };
