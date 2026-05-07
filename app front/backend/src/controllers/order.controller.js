const orderService = require('../services/order.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Controller: Place a new order
 * @route POST /api/v1/orders
 */
const createOrder = asyncHandler(async (req, res) => {

  const {
    shippingAddress,
    payment,
    notes,
    giftMessage
  } = req.body;

  const order = await orderService.createOrder(
    req.user._id,
    shippingAddress,
    payment?.method || 'cod',
    notes,
    giftMessage
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      'Order placed successfully',
      order
    )
  );
});

/**
 * Controller: Get user order history
 * @route GET /api/v1/orders
 */
const getMyOrders = asyncHandler(async (req, res) => {

  const orders = await orderService.getUserOrders(req.user._id);

  return res.status(200).json(
    new ApiResponse(
      200,
      'Orders fetched successfully',
      orders
    )
  );
});

/**
 * Controller: Get single order details
 * @route GET /api/v1/orders/:id
 */
const getOrderDetails = asyncHandler(async (req, res) => {

  const order = await orderService.getOrderById(
    req.params.id,
    req.user._id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      'Order details fetched successfully',
      order
    )
  );
});

/**
 * Controller: Update order status (Admin)
 * @route PUT /api/v1/orders/:id/status
 */
const updateOrderStatus = asyncHandler(async (req, res) => {

  const { status } = req.body;

  const order = await orderService.updateOrderStatus(
    req.params.id,
    status
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      'Order status updated successfully',
      order
    )
  );
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  updateOrderStatus,
};