const express = require('express');
const cartController = require('../controllers/cart.controller');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

// All cart routes require authentication
router.use(authenticate);

// Get user cart
router.get('/', cartController.getCart);

// Add item to cart
router.post('/', cartController.addToCart);

// Clear entire cart (must be placed before /:productId to prevent 'clear' being treated as an ID)
router.delete('/', cartController.clearCart);

// Update item quantity in cart
router.put('/:productId', cartController.updateQuantity);

// Remove item from cart
router.delete('/:productId', cartController.removeFromCart);

module.exports = router;
