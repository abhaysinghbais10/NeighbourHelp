/**
 * Transaction Model
 * Stores payment transaction records for auditing.
 */
const mongoose = require('mongoose');
const { PAYMENT_STATUS } = require('../utils/constants');

const transactionSchema = new mongoose.Schema(
  {
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    razorpayOrderId: {
      type: String,
      required: true,
      index: true,
    },
    razorpayPaymentId: String,
    razorpaySignature: String,
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    status: {
      type: String,
      enum: Object.values(PAYMENT_STATUS),
      default: PAYMENT_STATUS.PENDING,
    },
    method: String, // card, upi, netbanking, wallet
    errorCode: String,
    errorDescription: String,
    refundId: String,
    refundAmount: Number,
    refundedAt: Date,
    metadata: mongoose.Schema.Types.Mixed,
  },
  { timestamps: true }
);

transactionSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Transaction', transactionSchema);
