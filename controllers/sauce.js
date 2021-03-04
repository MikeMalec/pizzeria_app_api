const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { Sauce } = require('../models');

/**
 * @desc add sauce
 * @route products/sauces
 * @access Private/admin
 */
exports.addSauce = asyncHandler(async (req, res, next) => {
  const sauce = await Sauce.create(req.body);
  res.json(sauce);
});

/**
 * @desc update sauce
 * @route PUT products/sauces/:id
 * @access Private/admin
 */
exports.updateSauce = asyncHandler(async (req, res, next) => {
  const { name, small_price, big_price } = req.body;
  const sauce = await Sauce.findByPk(req.params.id);
  sauce.name = name;
  sauce.small_price = small_price;
  sauce.big_price = big_price;
  await sauce.save();
  res.json(sauce);
});

/**
 * @desc delete sauce
 * @route DELETE products/sauces/:id
 * @access Private/admin
 */
exports.deleteSauce = asyncHandler(async (req, res, next) => {
  const sauce = await Sauce.findByPk(req.params.id);
  await sauce.destroy();
  res.json({});
});
