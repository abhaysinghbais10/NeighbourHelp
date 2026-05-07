const Product = require('../models/Product');
const ApiError = require('../utils/ApiError');

/**
 * Service: Create a new product
 */
const createProduct = async (productData) => {
  const product = await Product.create(productData);
  return product;
};

/**
 * Service: Get all products with pagination and filtering
 */
const getProducts = async (query) => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt',
    category,
    minPrice,
    maxPrice,
    search,
    tags,
    occasion,
    isFeatured,
    inStock,
  } = query;

  const filter = { isActive: true };

  // Search logic
  if (search) {
    filter.$text = { $search: search };
  }

  // Filters
  if (category) filter.category = category;
  if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';
  if (occasion) filter.occasion = { $in: occasion.split(',') };
  if (tags) filter.tags = { $in: tags.split(',') };

  // Price range
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  // Stock availability
  if (inStock === 'true') filter.stock = { $gt: 0 };
  else if (inStock === 'false') filter.stock = 0;

  // Pagination
  const skip = (Number(page) - 1) * Number(limit);

  // Sorting
  let sortCriteria = sort;
  if (search && sort === '-createdAt') {
    sortCriteria = { score: { $meta: 'textScore' } }; // Default search sort
  } else if (sort === 'price') sortCriteria = { price: 1 };
  else if (sort === '-price') sortCriteria = { price: -1 };
  else if (sort === 'ratings') sortCriteria = { 'ratings.average': -1 };

  const [products, total] = await Promise.all([
    Product.find(filter)
      .sort(sortCriteria)
      .skip(skip)
      .limit(Number(limit))
      .populate('category', 'name slug'),
    Product.countDocuments(filter),
  ]);

  return { products, total, page: Number(page), limit: Number(limit) };
};

/**
 * Service: Get a single product by ID or Slug
 */
const getProductByIdOrSlug = async (identifier) => {
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);
  const filter = isObjectId ? { _id: identifier } : { slug: identifier };
  filter.isActive = true;

  const product = await Product.findOne(filter).populate('category', 'name slug');
  
  if (!product) {
    throw ApiError.notFound('Product not found');
  }

  return product;
};

module.exports = {
  createProduct,
  getProducts,
  getProductByIdOrSlug,
};
