const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const config = require('./config/environment');

const { apiLimiter, authLimiter, paymentLimiter } = require('./middlewares/rateLimiter');
const errorHandler = require('./middlewares/errorHandler');
const ApiError = require('./utils/ApiError');

// Import routes
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');
const categoryRoutes = require('./routes/category.routes');

const app = express();

// --- Security & Utility Middlewares ---
// Set security HTTP headers
app.use(helmet());

// CORS config
const corsOptions = {
  origin: config.cors.origin,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Sanitize data against NoSQL query injection
app.use(mongoSanitize());

// Prevent HTTP Parameter Pollution
app.use(hpp());

// Compression
app.use(compression());

// Logging
if (config.node.isDevelopment) {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Default API rate limiter
app.use('/api', apiLimiter);

// --- Routes ---
// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date() });
});

// Mount modular routes
app.use('/api/v1/auth', authLimiter, authRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/payments', paymentLimiter, paymentRoutes);

// Catch 404
app.use((req, res, next) => {
  next(ApiError.notFound(`Cannot find ${req.originalUrl} on this server!`));
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
