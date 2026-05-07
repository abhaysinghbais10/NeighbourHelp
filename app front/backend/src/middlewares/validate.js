/**
 * Joi Validation Middleware
 * Generic validator that works with any Joi schema.
 */
const ApiError = require('../utils/ApiError');

/**
 * Validate request data against a Joi schema.
 * @param {Object} schema - Joi schema with body/params/query keys
 */
const validate = (schema) => (req, _res, next) => {
  const validationErrors = [];

  ['body', 'params', 'query'].forEach((source) => {
    if (schema[source]) {
      const { error, value } = schema[source].validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
        errors: { wrap: { label: '' } },
      });

      if (error) {
        const messages = error.details.map((detail) => detail.message);
        validationErrors.push(...messages);
      } else {
        // Replace with validated + sanitized values
        req[source] = value;
      }
    }
  });

  if (validationErrors.length > 0) {
    throw ApiError.badRequest('Validation failed', validationErrors);
  }

  next();
};

module.exports = validate;
