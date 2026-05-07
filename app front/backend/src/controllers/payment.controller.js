const paymentService = require('../services/payment.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Controller: Create Razorpay Order
 * @route POST /api/v1/payments/create-order
 */
const createPaymentOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.body;
  const paymentInfo = await paymentService.createPaymentOrder(orderId, req.user._id);
  return res.status(200).json(new ApiResponse(200, 'Razorpay order created', paymentInfo));
});

/**
 * Controller: Verify Payment
 * @route POST /api/v1/payments/verify
 */
const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;
  const result = await paymentService.verifyPayment(
    razorpayOrderId,
    razorpayPaymentId,
    razorpaySignature,
    req.user._id
  );
  return res.status(200).json(new ApiResponse(200, result.message, null));
});

module.exports = {
  createPaymentOrder,
  verifyPayment,
};
