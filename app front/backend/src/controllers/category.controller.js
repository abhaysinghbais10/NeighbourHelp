const categoryService = require('../services/category.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @desc    Create new category
 * @route   POST /api/v1/categories
 * @access  Private/Admin
 */
const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body);
  return ApiResponse.created(res, 'Category created successfully', category);
});

/**
 * @desc    Get all categories
 * @route   GET /api/v1/categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.getAllCategories();
  return ApiResponse.success(res, 'Categories retrieved successfully', categories);
});

/**
 * @desc    Get single category by ID
 * @route   GET /api/v1/categories/:id
 * @access  Public
 */
const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryById(req.params.id);
  return ApiResponse.success(res, 'Category retrieved successfully', category);
});

/**
 * @desc    Update category
 * @route   PUT /api/v1/categories/:id
 * @access  Private/Admin
 */
const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.id, req.body);
  return ApiResponse.success(res, 'Category updated successfully', category);
});

/**
 * @desc    Delete category
 * @route   DELETE /api/v1/categories/:id
 * @access  Private/Admin
 */
const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.id);
  return ApiResponse.success(res, 'Category deleted successfully', null);
});

module.exports = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
