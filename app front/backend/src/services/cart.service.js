const Cart = require('../models/Cart');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

/**
 * Helper: calculate total
 */
const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

/**
 * Get Cart
 */
const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], total: 0 });
  }

  return cart;
};

/**
 * Add to Cart
 */
const addToCart = async (userId, productId, quantity = 1) => {
  const product = await Product.findById(productId);

  if (!product || !product.isActive) {
    throw ApiError.notFound('Product not found or inactive');
  }

  if (product.stock < quantity) {
    throw ApiError.badRequest('Insufficient stock');
  }

  const cart = await getCart(userId);

  const index = cart.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (index > -1) {
    const newQty = cart.items[index].quantity + quantity;

    if (product.stock < newQty) {
      throw ApiError.badRequest('Insufficient stock for updated quantity');
    }

    cart.items[index].quantity = newQty;
  } else {
    cart.items.push({
      product: product._id,
      name: product.name,
      price: product.price,
      image: product.images?.[0]?.url || '',
      quantity: Number(quantity),
    });
  }

  // ✅ total update
  cart.total = calculateTotal(cart.items);

  await cart.save();
  return cart;
};

/**
 * Update Quantity
 */
const updateQuantity = async (userId, productId, quantity) => {
  if (quantity < 1) {
    throw ApiError.badRequest('Quantity must be at least 1');
  }

  const cart = await getCart(userId);

  const index = cart.items.findIndex(
    (item) => item.product.toString() === productId.toString()
  );

  if (index === -1) {
    throw ApiError.notFound('Item not found in cart');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  if (product.stock < quantity) {
    throw ApiError.badRequest('Insufficient stock');
  }

  cart.items[index].quantity = quantity;

  // ✅ total update
  cart.total = calculateTotal(cart.items);

  await cart.save();
  return cart;
};

/**
 * Remove from Cart
 */
const removeFromCart = async (userId, productId) => {
  const cart = await getCart(userId);

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId.toString()
  );

  // ✅ total update
  cart.total = calculateTotal(cart.items);

  await cart.save();
  return cart;
};

/**
 * Clear Cart
 */
const clearCart = async (userId) => {
  const cart = await getCart(userId);

  cart.items = [];
  cart.total = 0;

  await cart.save();
  return cart;
};

module.exports = {
  getCart,
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
};