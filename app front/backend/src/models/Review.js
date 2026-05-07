/**
 * Review Model
 * Product reviews with rating aggregation hooks.
 */
const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot exceed 5'],
    },
    title: {
      type: String,
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxlength: [1000, 'Comment cannot exceed 1000 characters'],
    },
    isVerifiedPurchase: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// One review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Static: recalculate product ratings after review changes
reviewSchema.statics.calculateAverageRating = async function (productId) {
  const Product = mongoose.model('Product');
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: '$product',
        averageRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      'ratings.average': Math.round(result[0].averageRating * 10) / 10,
      'ratings.count': result[0].reviewCount,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      'ratings.average': 0,
      'ratings.count': 0,
    });
  }
};

// Recalculate on save and remove
reviewSchema.post('save', function () {
  this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post('findOneAndDelete', function (doc) {
  if (doc) {
    doc.constructor.calculateAverageRating(doc.product);
  }
});

module.exports = mongoose.model('Review', reviewSchema);
