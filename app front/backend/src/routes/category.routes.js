const express = require('express');
const categoryController = require('../controllers/category.controller');
const categoryValidator = require('../validators/category.validator');
const validate = require('../middlewares/validate');
const { authenticate, authorize } = require('../middlewares/authenticate');
const { ROLES } = require('../utils/constants');

const router = express.Router();

// Public routes
router.get('/', categoryController.getCategories);
router.get(
  '/:id',
  validate(categoryValidator.getCategory),
  categoryController.getCategory
);

// Protected Admin routes
router.use(authenticate, authorize(ROLES.ADMIN));

router.post(
  '/',
  validate(categoryValidator.createCategory),
  categoryController.createCategory
);

router.put(
  '/:id',
  validate(categoryValidator.updateCategory),
  categoryController.updateCategory
);

router.delete(
  '/:id',
  validate(categoryValidator.deleteCategory),
  categoryController.deleteCategory
);

module.exports = router;
