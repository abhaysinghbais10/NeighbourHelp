/**
 * Razorpay Configuration
 * Initializes Razorpay SDK instance.
 */
const Razorpay = require('razorpay');
const config = require('./environment');

let instance = null;

const getRazorpayInstance = () => {
  if (instance) return instance;

  instance = new Razorpay({
    key_id: config.razorpay.keyId,
    key_secret: config.razorpay.keySecret,
  });

  return instance;
};

module.exports = { getRazorpayInstance };
