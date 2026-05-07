const Category = require('../models/Category');
const ApiError = require('../utils/ApiError');

/**
 * Create a new category
 * @param {Object} data - Category data
 * @returns {Promise<Object>} Created category
 */
const createCategory = async (data) => {
  const existingCategory = await Category.findOne({ name: data.name });
  if (existingCategory) {
    throw ApiError.conflict(`Category with name '${data.name}' already exists.`);
  }

  const category = await Category.create(data);
  return category;
};

/**
 * Get all categories
 * @returns {Promise<Array>} List of categories
 */
const getAllCategories = async () => {
  const categories = await Category.find().sort({ createdAt: -1 });
  return categories;
};

/**
 * Get category by ID
 * @param {String} id - Category ID
 * @returns {Promise<Object>} Category object
 */
const getCategoryById = async (id) => {
  const category = await Category.findById(id);
  if (!category) {
    throw ApiError.notFound('Category not found');
  }
  return category;
};

/**
 * Update category
 * @param {String} id - Category ID
 * @param {Object} data - Update data
 * @returns {Promise<Object>} Updated category
 */
const updateCategory = async (id, data) => {
  if (data.name) {
    const existingCategory = await Category.findOne({
      name: data.name,
      _id: { $ne: id },
    });
    if (existingCategory) {
      throw ApiError.conflict(`Category with name '${data.name}' already exists.`);
    }
  }

  const category = await Category.findById(id);
  if (!category) {
    throw ApiError.notFound('Category not found');
  }

  // Use Object.assign to trigger pre-save hook for slug generation if name is changed
  Object.assign(category, data);
  await category.save();

  return category;
};

/**
 * Delete category
 * @param {String} id - Category ID
 * @returns {Promise<Object>} Deleted category
 */
const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw ApiError.notFound('Category not found');
  }
  return category;
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
