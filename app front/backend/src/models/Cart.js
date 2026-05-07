const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, 'Quantity cannot be less than 1'],
      default: 1,
    },
  },
  { _id: false } // Avoid generating separate ObjectIds for cart items unless necessary
);

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true, // A user should only have one active cart
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Pre-save middleware to dynamically calculate the total price
cartSchema.pre('save', function (next) {
  if (this.items && this.items.length > 0) {
    this.total = this.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  } else {
    this.total = 0;
  }
  next();
});

module.exports = mongoose.model('Cart', cartSchema);
