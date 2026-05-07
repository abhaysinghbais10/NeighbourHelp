/**
 * Environment Configuration
 * Validates and exports all environment variables with defaults.
 * Fails fast on missing critical config in production.
 */
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const requiredVars = ['MONGODB_URI', 'JWT_SECRET', 'JWT_REFRESH_SECRET'];

const validateEnv = () => {
  const missing = requiredVars.filter((key) => !process.env[key]);
  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
  }
};

validateEnv();

module.exports = {
  node: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 5000,
    isProduction: process.env.NODE_ENV === 'production',
    isDevelopment: process.env.NODE_ENV === 'development',
  },
  db: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/phool-basket',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: process.env.JWT_REFRESH_EXPIRE || '30d',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID,
    keySecret: process.env.RAZORPAY_KEY_SECRET,
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS, 10) || 900000,
    max: parseInt(process.env.RATE_LIMIT_MAX, 10) || 100,
  },
  client: {
    url: process.env.CLIENT_URL || 'http://localhost:8081',
  },
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:8081',
    credentials: true,
  },
  log: {
    level: process.env.LOG_LEVEL || 'info',
  },
};
