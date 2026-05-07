const cartService = require('../services/cart.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * @desc    Get user cart
 * @route   GET /api/v1/cart
 * @access  Private
 */
const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user._id);
  return ApiResponse.success(res, 'Cart fetched successfully', cart);
});

/**
 * @desc    Add item to cart
 * @route   POST /api/v1/cart
 * @access  Private
 */
const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await cartService.addToCart(req.user._id, productId, quantity);
  return ApiResponse.success(res, 'Item added to cart successfully', cart);
});

/**
 * @desc    Update item quantity in cart
 * @route   PUT /api/v1/cart/:productId
 * @access  Private
 */
const updateQuantity = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const cart = await cartService.updateQuantity(req.user._id, productId, quantity);
  return ApiResponse.success(res, 'Cart updated successfully', cart);
});

/**
 * @desc    Remove item from cart
 * @route   DELETE /api/v1/cart/:productId
 * @access  Private
 */
const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await cartService.removeFromCart(req.user._id, productId);
  return ApiResponse.success(res, 'Item removed from cart successfully', cart);
});

/**
 * @desc    Clear entire cart
 * @route   DELETE /api/v1/cart
 * @access  Private
 */
const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearCart(req.user._id);
  return ApiResponse.success(res, 'Cart cleared successfully', cart);
});

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};
