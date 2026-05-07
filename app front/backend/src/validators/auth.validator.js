/**
 * Auth Validators
 * Joi schemas for signup, login, and token refresh.
 */
const Joi = require('joi');

const signup = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(50).required()
      .messages({ 'any.required': 'Name is required' }),
    email: Joi.string().email().lowercase().trim().required()
      .messages({ 'string.email': 'Please provide a valid email' }),
    password: Joi.string().min(6).max(128).required()
      .messages({ 'string.min': 'Password must be at least 6 characters' }),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional()
      .messages({ 'string.pattern.base': 'Please enter a valid 10-digit Indian phone number' }),
  }),
};

const login = {
  body: Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required(),
  }),
};

const refreshToken = {
  body: Joi.object({
    refreshToken: Joi.string().required(),
  }),
};

const updateProfile = {
  body: Joi.object({
    name: Joi.string().trim().min(2).max(50).optional(),
    phone: Joi.string().pattern(/^[6-9]\d{9}$/).optional()
      .messages({ 'string.pattern.base': 'Please enter a valid 10-digit Indian phone number' }),
  }),
};

const changePassword = {
  body: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string().min(6).max(128).required()
      .messages({ 'string.min': 'New password must be at least 6 characters' }),
  }),
};

module.exports = { signup, login, refreshToken, updateProfile, changePassword };
