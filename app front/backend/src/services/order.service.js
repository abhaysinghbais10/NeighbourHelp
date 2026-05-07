const Order = require('../models/Order');
const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');
const cartService = require('./cart.service');
const { PAYMENT_STATUS, ORDER_STATUS } = require('../utils/constants');

/**
 * Service: Create order from user's cart
 */
const createOrder = async (
  userId,
  shippingAddress,
  paymentMethod = 'cod',
  notes,
  giftMessage
) => {

  // Get cart
  const cart = await cartService.getCart(userId);

  if (!cart || cart.items.length === 0) {
    throw ApiError.badRequest('Cart is empty');
  }

  // Verify stock and calculate exact price
  let subtotal = 0;
  const orderItems = [];

  for (const item of cart.items) {

    const product = await Product.findById(item.product);

    if (!product || !product.isActive) {
      throw ApiError.badRequest(
        `Product ${item.name} is no longer available`
      );
    }

    if (product.stock < item.quantity) {
      throw ApiError.badRequest(
        `Insufficient stock for ${product.name}`
      );
    }

    subtotal += product.price * item.quantity;

    orderItems.push({
      product: product._id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
      image: product.images?.[0]?.url || '',
    });
  }

  // Pricing
  const deliveryCharge = subtotal > 500 ? 0 : 50;
  const tax = subtotal * 0.18;
  const total = subtotal + deliveryCharge + tax;

  // Reduce stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(
      item.product,
      {
        $inc: { stock: -item.quantity }
      }
    );
  }

  // Create Order
  const order = await Order.create({

    user: userId,

    items: orderItems,

    shippingAddress: {
      fullName: shippingAddress.fullName,
      phone: shippingAddress.phone,
      addressLine1: shippingAddress.addressLine1,
      addressLine2: shippingAddress.addressLine2 || '',
      city: shippingAddress.city,
      state: shippingAddress.state,
      pincode: shippingAddress.pincode,
      landmark: shippingAddress.landmark || '',
    },

    pricing: {
      subtotal,
      deliveryCharge,
      tax,
      total,
    },

    payment: {
      method: paymentMethod,
      status: PAYMENT_STATUS.PENDING,
    },

    notes,
    giftMessage,
  });

  // Clear cart
  await cartService.clearCart(userId);

  return order;
};

/**
 * Service: Get User Orders
 */
const getUserOrders = async (userId) => {
  return await Order.find({ user: userId }).sort('-createdAt');
};

/**
 * Service: Get single Order
 */
const getOrderById = async (orderId, userId) => {

  const order = await Order.findOne({
    _id: orderId,
    user: userId
  });

  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  return order;
};

/**
 * Service: Update Order Status (Admin)
 */
const updateOrderStatus = async (orderId, status) => {

  const order = await Order.findById(orderId);

  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  order.status = status;

  if (status === ORDER_STATUS.DELIVERED) {

    order.deliveredAt = new Date();

    if (order.payment.method === 'cod') {

      order.payment.status = PAYMENT_STATUS.COMPLETED;
      order.payment.paidAt = new Date();
    }

  } else if (status === ORDER_STATUS.CANCELLED) {

    order.cancelledAt = new Date();

    // Restock items
    for (const item of order.items) {

      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: { stock: item.quantity }
        }
      );
    }
  }

  await order.save();

  return order;
};

module.exports = {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
};