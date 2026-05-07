/**
 * Product Model
 * Full-featured product schema with ratings, stock, images, and search indexing.
 */
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
      maxlength: [200, 'Product name cannot exceed 200 characters'],
      index: 'text',
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      required: [true, 'Product description is required'],
      maxlength: [2000, 'Description cannot exceed 2000 characters'],
    },
    shortDescription: {
      type: String,
      maxlength: [300, 'Short description cannot exceed 300 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    compareAtPrice: {
      type: Number,
      min: [0, 'Compare price cannot be negative'],
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
      index: true,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        publicId: { type: String, required: true },
        alt: String,
        isPrimary: { type: Boolean, default: false },
      },
    ],
    stock: {
      type: Number,
      required: [true, 'Stock is required'],
      min: [0, 'Stock cannot be negative'],
      default: 0,
    },
    sku: {
      type: String,
      unique: true,
      sparse: true,
      uppercase: true,
      trim: true,
    },
    weight: {
      value: Number,
      unit: { type: String, enum: ['g', 'kg'], default: 'g' },
    },
    dimensions: {
      length: Number,
      width: Number,
      height: Number,
      unit: { type: String, enum: ['cm', 'in'], default: 'cm' },
    },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    deliveryInfo: {
      estimatedDays: { type: Number, default: 3 },
      isFreeDelivery: { type: Boolean, default: false },
      deliveryCharge: { type: Number, default: 0 },
    },
    occasion: [
      {
        type: String,
        trim: true,
        enum: [
          'birthday',
          'anniversary',
          'wedding',
          'diwali',
          'holi',
          'raksha-bandhan',
          'valentines',
          'mothers-day',
          'fathers-day',
          'christmas',
          'new-year',
          'thank-you',
          'congratulations',
          'get-well',
          'sympathy',
          'other',
        ],
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Compound indexes for query performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, isActive: 1 });
productSchema.index({ price: 1 });
productSchema.index({ 'ratings.average': -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isFeatured: 1, isActive: 1 });
productSchema.index({ occasion: 1 });

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function () {
  if (this.compareAtPrice && this.compareAtPrice > this.price) {
    return Math.round(((this.compareAtPrice - this.price) / this.compareAtPrice) * 100);
  }
  return 0;
});

// Virtual for in-stock status
productSchema.virtual('inStock').get(function () {
  return this.stock > 0;
});

// Virtual for reviews
productSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
});

// Auto-generate slug
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    const timestamp = Date.now().toString(36);
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + timestamp;
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
