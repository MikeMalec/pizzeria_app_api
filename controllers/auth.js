const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { User } = require('../models');

/**
 * @desc login
 * @route POST /auth/login
 * @access Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user) {
    const passwordMatches = await user.matchPassword(password);
    if (passwordMatches) {
      const token = await user.getSignedJwtToken();
      user.token = token;
      await user.save();
      res.json({ token: token });
    } else {
      return next(new ErrorResponse('Not authorized'));
    }
  } else {
    return next(new ErrorResponse('Not authorized'));
  }
});

/**
 * @desc register
 * @route POST /auth/register
 * @access Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.create({ email, password });
  const token = await user.getSignedJwtToken();
  user.token = token;
  await user.save();
  res.json({ token: token });
});

/**
 * @desc logout
 * @route POST /auth/logout
 * @access Private
 */
exports.logout = asyncHandler(async (req, res, next) => {
  const user = req.user;
  user.token = null;
  await user.save();
  res.json({ message: 'log out' });
});

/**
 * @desc refresh token
 * @route POST /auth/refresh
 * @access Private
 */
exports.refresh = asyncHandler(async (req, res, next) => {
  console.log('REFRESH');
  const user = req.user;
  const token = await user.getSignedJwtToken();
  user.token = token;
  await user.save();
  res.json({ token });
});
