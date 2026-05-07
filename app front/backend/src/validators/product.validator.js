/**
 * Product Validators
 */
const Joi = require('joi');

const createProduct = {
  body: Joi.object({
    name: Joi.string().trim().max(200).required(),
    description: Joi.string().trim().max(2000).required(),
    shortDescription: Joi.string().trim().max(300).optional(),
    price: Joi.number().positive().required(),
    compareAtPrice: Joi.number().positive().optional(),
    category: Joi.string().hex().length(24).required()
      .messages({ 'string.length': 'Invalid category ID' }),
    tags: Joi.array().items(Joi.string().trim().lowercase()).optional(),
    stock: Joi.number().integer().min(0).required(),
    sku: Joi.string().trim().optional(),
    weight: Joi.object({
      value: Joi.number().positive().optional(),
      unit: Joi.string().valid('g', 'kg').optional(),
    }).optional(),
    isFeatured: Joi.boolean().optional(),
    occasion: Joi.array().items(
      Joi.string().valid(
        'birthday', 'anniversary', 'wedding', 'diwali', 'holi',
        'raksha-bandhan', 'valentines', 'mothers-day', 'fathers-day',
        'christmas', 'new-year', 'thank-you', 'congratulations',
        'get-well', 'sympathy', 'other'
      )
    ).optional(),
    deliveryInfo: Joi.object({
      estimatedDays: Joi.number().integer().min(1).optional(),
      isFreeDelivery: Joi.boolean().optional(),
      deliveryCharge: Joi.number().min(0).optional(),
    }).optional(),
  }),
};

const updateProduct = {
  params: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
  body: Joi.object({
    name: Joi.string().trim().max(200).optional(),
    description: Joi.string().trim().max(2000).optional(),
    shortDescription: Joi.string().trim().max(300).optional(),
    price: Joi.number().positive().optional(),
    compareAtPrice: Joi.number().positive().allow(null).optional(),
    category: Joi.string().hex().length(24).optional(),
    tags: Joi.array().items(Joi.string().trim().lowercase()).optional(),
    stock: Joi.number().integer().min(0).optional(),
    sku: Joi.string().trim().optional(),
    isActive: Joi.boolean().optional(),
    isFeatured: Joi.boolean().optional(),
    occasion: Joi.array().items(Joi.string()).optional(),
    deliveryInfo: Joi.object({
      estimatedDays: Joi.number().integer().min(1).optional(),
      isFreeDelivery: Joi.boolean().optional(),
      deliveryCharge: Joi.number().min(0).optional(),
    }).optional(),
  }).min(1),
};

const getProducts = {
  query: Joi.object({
    page: Joi.number().integer().min(1).optional(),
    limit: Joi.number().integer().min(1).max(50).optional(),
    sort: Joi.string().valid('price', '-price', 'createdAt', '-createdAt', 'ratings', 'name').optional(),
    category: Joi.string().hex().length(24).optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().positive().optional(),
    search: Joi.string().trim().max(200).optional(),
    tags: Joi.string().trim().optional(),
    occasion: Joi.string().trim().optional(),
    isFeatured: Joi.boolean().optional(),
    inStock: Joi.boolean().optional(),
  }),
};

module.exports = { createProduct, updateProduct, getProducts };
