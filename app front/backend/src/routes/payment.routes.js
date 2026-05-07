const express = require('express');
const paymentController = require('../controllers/payment.controller');
const { authenticate } = require('../middlewares/authenticate');

const router = express.Router();

router.use(authenticate);

router.post('/create-order', paymentController.createPaymentOrder);
router.post('/verify', paymentController.verifyPayment);

module.exports = router;
