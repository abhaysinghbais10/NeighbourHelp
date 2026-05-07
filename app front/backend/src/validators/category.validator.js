const Joi = require('joi');

const createCategory = {
  body: Joi.object({
    name: Joi.string().trim().min(2).required().messages({
      'string.base': 'Category name must be a string',
      'string.empty': 'Category name cannot be empty',
      'string.min': 'Category name must be at least 2 characters long',
      'any.required': 'Category name is required',
    }),
    isActive: Joi.boolean(),
  }),
};

const updateCategory = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid category ID format',
      'string.length': 'Invalid category ID length',
      'any.required': 'Category ID is required',
    }),
  }),
  body: Joi.object({
    name: Joi.string().trim().min(2).messages({
      'string.base': 'Category name must be a string',
      'string.empty': 'Category name cannot be empty',
      'string.min': 'Category name must be at least 2 characters long',
    }),
    isActive: Joi.boolean(),
  }).min(1),
};

const getCategory = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid category ID format',
      'string.length': 'Invalid category ID length',
      'any.required': 'Category ID is required',
    }),
  }),
};

const deleteCategory = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required().messages({
      'string.hex': 'Invalid category ID format',
      'string.length': 'Invalid category ID length',
      'any.required': 'Category ID is required',
    }),
  }),
};

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  deleteCategory,
};
