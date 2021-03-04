const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { PizzaAddon } = require('../models');

/**
 * @desc add pizza addon
 * @route products/pizzaAddons
 * @access Private/admin
 */
exports.addAddon = asyncHandler(async (req, res, next) => {
  const addon = await PizzaAddon.create(req.body);
  res.json(addon);
});

/**
 * @desc update addon
 * @route PUT products/pizzaAddons/:id
 * @access Private/admin
 */
exports.updateAddon = asyncHandler(async (req, res, next) => {
  const { name, price_24, price_30, price_40, price_50 } = req.body;
  const addon = await PizzaAddon.findByPk(req.params.id);
  addon.name = name;
  addon.price_24 = price_24;
  addon.price_30 = price_30;
  addon.price_40 = price_40;
  addon.price_50 = price_50;
  await addon.save();
  res.json(addon);
});

/**
 * @desc delete pizza addon
 * @route DELETE products/pizzaAddons/:id
 * @access Private/admin
 */
exports.deleteAddon = asyncHandler(async (req, res, next) => {
  const addon = await PizzaAddon.findByPk(req.params.id);
  await addon.destroy();
  res.json({});
});
