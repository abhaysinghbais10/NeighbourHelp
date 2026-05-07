const crypto = require('crypto');
const Order = require('../models/Order');
const Transaction = require('../models/Transaction');
const ApiError = require('../utils/ApiError');
const config = require('../config/environment');
const { getRazorpayInstance } = require('../config/razorpay');
const { PAYMENT_STATUS } = require('../utils/constants');

/**
 * Service: Create Razorpay Order
 */
const createPaymentOrder = async (orderId, userId) => {
  const order = await Order.findOne({ _id: orderId, user: userId });
  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  if (order.payment.status === PAYMENT_STATUS.COMPLETED) {
    throw ApiError.badRequest('Order is already paid');
  }

  const razorpay = getRazorpayInstance();

  const options = {
    amount: Math.round(order.pricing.total * 100), // amount in the smallest currency unit
    currency: 'INR',
    receipt: order.orderNumber,
  };

  const razorpayOrder = await razorpay.orders.create(options);

  // Update order with razorpayOrderId
  order.payment.razorpayOrderId = razorpayOrder.id;
  await order.save();

  // Create pending transaction
  await Transaction.create({
    order: order._id,
    user: userId,
    razorpayOrderId: razorpayOrder.id,
    amount: order.pricing.total,
    status: PAYMENT_STATUS.PENDING,
  });

  return {
    razorpayOrderId: razorpayOrder.id,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
  };
};

/**
 * Service: Verify Razorpay Payment Signature
 */
const verifyPayment = async (razorpayOrderId, razorpayPaymentId, razorpaySignature, userId) => {
  const body = razorpayOrderId + '|' + razorpayPaymentId;

  const expectedSignature = crypto
    .createHmac('sha256', config.razorpay.keySecret)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpaySignature;

  const transaction = await Transaction.findOne({ razorpayOrderId, user: userId });
  if (!transaction) {
    throw ApiError.notFound('Transaction not found');
  }

  const order = await Order.findOne({ _id: transaction.order });
  if (!order) {
    throw ApiError.notFound('Order not found');
  }

  if (isAuthentic) {
    // Payment is successful
    transaction.status = PAYMENT_STATUS.COMPLETED;
    transaction.razorpayPaymentId = razorpayPaymentId;
    transaction.razorpaySignature = razorpaySignature;
    await transaction.save();

    order.payment.status = PAYMENT_STATUS.COMPLETED;
    order.payment.razorpayPaymentId = razorpayPaymentId;
    order.payment.razorpaySignature = razorpaySignature;
    order.payment.paidAt = new Date();
    await order.save();

    return { success: true, message: 'Payment verified successfully' };
  } else {
    // Payment failed
    transaction.status = PAYMENT_STATUS.FAILED;
    await transaction.save();

    order.payment.status = PAYMENT_STATUS.FAILED;
    await order.save();

    throw ApiError.badRequest('Invalid payment signature');
  }
};

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
