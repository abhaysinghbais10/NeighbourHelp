const authService = require('../services/auth.service');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

/**
 * Controller: Register a new user
 * @route POST /api/v1/auth/register
 */
const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.registerUser(req.body);

  // Set refresh token in HTTP-only cookie (optional but good practice)
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  return res
    .status(201)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(201, 'User registered successfully', { user, accessToken }));
});

/**
 * Controller: Login a user
 * @route POST /api/v1/auth/login
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const { user, accessToken, refreshToken } = await authService.loginUser(email, password);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  };

  return res
    .status(200)
    .cookie('refreshToken', refreshToken, options)
    .json(new ApiResponse(200, 'User logged in successfully', { user, accessToken }));
});

module.exports = {
  register,
  login,
};
