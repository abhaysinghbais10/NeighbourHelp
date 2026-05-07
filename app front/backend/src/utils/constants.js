/**
 * Application Constants
 */
module.exports = {
  // User roles
  ROLES: {
    USER: 'user',
    ADMIN: 'admin',
  },

  // Order statuses
  ORDER_STATUS: {
    PENDING: 'pending',
    CONFIRMED: 'confirmed',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
    REFUNDED: 'refunded',
  },

  // Payment statuses
  PAYMENT_STATUS: {
    PENDING: 'pending',
    COMPLETED: 'completed',
    FAILED: 'failed',
    REFUNDED: 'refunded',
  },

  // Redis key prefixes
  REDIS_KEYS: {
    CART: 'cart:',
    PRODUCT_CACHE: 'product:',
    PRODUCTS_LIST: 'products:list:',
    CATEGORIES: 'categories:all',
    USER_SESSION: 'session:',
  },

  // Cache TTLs (seconds)
  CACHE_TTL: {
    SHORT: 300,       // 5 minutes
    MEDIUM: 1800,     // 30 minutes
    LONG: 3600,       // 1 hour
    DAY: 86400,       // 24 hours
    CART: 604800,     // 7 days
  },

  // Pagination defaults
  PAGINATION: {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 12,
    MAX_LIMIT: 50,
  },

  // Product
  PRODUCT: {
    MAX_IMAGES: 5,
    MAX_NAME_LENGTH: 200,
    MAX_DESCRIPTION_LENGTH: 2000,
  },
};
