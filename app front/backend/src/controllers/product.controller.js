const productService = require('../services/product.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Controller: Create a product
 * @route POST /api/v1/products
 * @access Private/Admin
 */
const createProduct = asyncHandler(async (req, res) => {
  const productData = { ...req.body, createdBy: req.user._id };
  // Mock images if not provided (since Cloudinary integration is usually separate or handled by multer)
  if (!productData.images || productData.images.length === 0) {
    productData.images = [{ url: 'mock_url', publicId: 'mock_id', isPrimary: true }];
  }

  const product = await productService.createProduct(productData);
  return res.status(201).json(new ApiResponse(201, 'Product created successfully', product));
});

/**
 * Controller: Get all products
 * @route GET /api/v1/products
 * @access Public
 */
const getProducts = asyncHandler(async (req, res) => {
  const { products, total, page, limit } = await productService.getProducts(req.query);

  return ApiResponse.paginated(res, 'Products fetched successfully', {
    docs: products,
    total,
    page,
    limit,
  });
});

/**
 * Controller: Get single product
 * @route GET /api/v1/products/:id
 * @access Public
 */
const getProduct = asyncHandler(async (req, res) => {
  const product = await productService.getProductByIdOrSlug(req.params.id);
  return res.status(200).json(new ApiResponse(200, 'Product fetched successfully', product));
});

module.exports = {
  createProduct,
  getProducts,
  getProduct,
};
