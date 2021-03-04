const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { Salad } = require('../models');

/**
 * @desc get all salads
 * @route products/salads
 * @access Private/admin
 */
exports.getSalads = asyncHandler(async (req, res, next) => {
  const salads = await Salad.findAll({ order: [['id', 'ASC']] });
  res.json(salads);
});

/**
 * @desc add salad
 * @route products/salads
 * @access Private/admin
 */
exports.addSalad = asyncHandler(async (req, res, next) => {
  const salad = await Salad.create(req.body);
  res.json(salad);
});

/**
 * @desc update salad
 * @route PUT products/salads/:id
 * @access Private/admin
 */
exports.updateSalad = asyncHandler(async (req, res, next) => {
  const { number, name, ingredients, price } = req.body;
  const salad = await Salad.findByPk(req.params.id);
  salad.number = number;
  salad.name = name;
  salad.ingredients = ingredients;
  salad.price = price;
  await salad.save();
  res.json(salad);
});

/**
 * @desc delete salad
 * @route DELETE products/salads/:id
 * @access Private/admin
 */
exports.deleteSalad = asyncHandler(async (req, res, next) => {
  const salad = await Salad.findByPk(req.params.id);
  await salad.destroy();
  res.json({});
});
