/**
 * Cloudinary Configuration
 * Configures Cloudinary SDK and exports multer upload middleware.
 */
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const config = require('./environment');
const logger = require('../utils/logger');

cloudinary.config({
  cloud_name: config.cloudinary.cloudName,
  api_key: config.cloudinary.apiKey,
  api_secret: config.cloudinary.apiSecret,
});

// Verify connection (non-blocking)
if (config.cloudinary.cloudName && config.cloudinary.cloudName !== 'your-cloud-name') {
  cloudinary.api
    .ping()
    .then(() => logger.info('Cloudinary: connected'))
    .catch((err) => logger.warn('Cloudinary: ping failed -', err.message));
}

const createStorage = (folder = 'phool-basket/products') => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder,
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
      transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
    },
  });
};

const createUploader = (folder, maxFiles = 5) => {
  const storage = createStorage(folder);
  return multer({
    storage,
    limits: {
      fileSize: 5 * 1024 * 1024, // 5MB
      files: maxFiles,
    },
    fileFilter: (_req, file, cb) => {
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (allowed.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Only JPG, PNG, and WebP images are allowed'), false);
      }
    },
  });
};

const deleteImage = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    logger.error(`Cloudinary delete failed for ${publicId}:`, error.message);
    throw error;
  }
};

module.exports = { cloudinary, createUploader, deleteImage };
