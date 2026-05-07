const User = require('../models/User');
const ApiError = require('../utils/ApiError');

/**
 * Service: Register new user
 */
const registerUser = async (userData) => {
  const { name, email, password, phone } = userData;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict('User with this email already exists');
  }

  // Create new user
  const user = await User.create({ name, email, password, phone });

  // Generate tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Save refresh token in DB
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { user, accessToken, refreshToken };
};

/**
 * Service: Login user
 */
const loginUser = async (email, password) => {
  // Find user and include password and refreshToken for validation
  const user = await User.findOne({ email }).select('+password');
  
  if (!user) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  // Generate new tokens
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // Update refresh token
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  // Remove password from returned user object
  const userObj = user.toObject();
  delete userObj.password;
  delete userObj.refreshToken;

  return { user: userObj, accessToken, refreshToken };
};

module.exports = {
  registerUser,
  loginUser,
};
