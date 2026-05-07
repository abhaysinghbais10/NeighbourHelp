/**
 * Order Model
 * Tracks order lifecycle from placement through delivery/cancellation.
 */
const mongoose = require('mongoose');
const { ORDER_STATUS, PAYMENT_STATUS } = require('../utils/constants');

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: String,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: {
        validator: (items) => items.length > 0,
        message: 'Order must contain at least one item',
      },
    },
    shippingAddress: {
      fullName: { type: String, required: true },
      phone: { type: String, required: true },
      addressLine1: { type: String, required: true },
      addressLine2: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      landmark: String,
    },
    pricing: {
      subtotal: { type: Number, required: true },
      deliveryCharge: { type: Number, default: 0 },
      discount: { type: Number, default: 0 },
      tax: { type: Number, default: 0 },
      total: { type: Number, required: true },
    },
    payment: {
      method: {
        type: String,
        enum: ['razorpay', 'cod'],
        required: true,
      },
      status: {
        type: String,
        enum: Object.values(PAYMENT_STATUS),
        default: PAYMENT_STATUS.PENDING,
      },
      razorpayOrderId: String,
      razorpayPaymentId: String,
      razorpaySignature: String,
      paidAt: Date,
    },
    status: {
      type: String,
      enum: Object.values(ORDER_STATUS),
      default: ORDER_STATUS.PENDING,
      index: true,
    },
    statusHistory: [
      {
        status: { type: String, enum: Object.values(ORDER_STATUS) },
        timestamp: { type: Date, default: Date.now },
        note: String,
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    giftMessage: {
      type: String,
      maxlength: [500, 'Gift message cannot exceed 500 characters'],
    },
    deliveryDate: Date,
    deliveredAt: Date,
    cancelledAt: Date,
    cancelReason: String,
    notes: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes
orderSchema.index({ createdAt: -1 });
orderSchema.index({ status: 1, user: 1 });
orderSchema.index({ 'payment.razorpayOrderId': 1 });

// Auto-generate order number
orderSchema.pre('save', async function (next) {
  if (this.isNew && !this.orderNumber) {
    const date = new Date();
    const prefix = 'PB';
    const datePart = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;
    const random = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.orderNumber = `${prefix}-${datePart}-${random}`;
  }

  // Add to status history on status change
  if (this.isModified('status')) {
    this.statusHistory.push({
      status: this.status,
      timestamp: new Date(),
    });
  }

  next();
});

module.exports = mongoose.model('Order', orderSchema);
