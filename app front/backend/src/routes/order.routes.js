const express = require('express');
const orderController = require('../controllers/order.controller');
const { authenticate, authorize } = require('../middlewares/authenticate');
const { ROLES } = require('../utils/constants');

const router = express.Router();

router.use(authenticate);

// User routes
router.post('/', orderController.createOrder);
router.get('/', orderController.getMyOrders);
router.get('/:id', orderController.getOrderDetails);

// Admin routes
router.put('/:id/status', authorize(ROLES.ADMIN), orderController.updateOrderStatus);

module.exports = router;
