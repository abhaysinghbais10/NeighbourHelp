const express = require('express');
const productController = require('../controllers/product.controller');
const validate = require('../middlewares/validate');
const productValidator = require('../validators/product.validator');
const { authenticate, authorize } = require('../middlewares/authenticate');
const { ROLES } = require('../utils/constants');

const router = express.Router();

// Public routes
router.get('/', validate(productValidator.getProducts), productController.getProducts);
router.get('/:id', productController.getProduct);

// Admin only routes
router.post(
  '/',
  authenticate,
  authorize(ROLES.ADMIN),
  validate(productValidator.createProduct),
  productController.createProduct
);

module.exports = router;
