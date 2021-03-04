const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { Pasta } = require('../models');

/**
 * @desc add pasta
 * @route products/pastas
 * @access Private/admin
 */
exports.getAllPasta = asyncHandler(async (req, res, next) => {
  const pastas = await Pasta.findAll({ order: [['id', 'ASC']] });
  res.json(pastas);
});

/**
 * @desc add pasta
 * @route products/pastas
 * @access Private/admin
 */
exports.addPasta = asyncHandler(async (req, res, next) => {
  const pasta = await Pasta.create(req.body);
  res.json(pasta);
});

/**
 * @desc update pasta
 * @route PUT products/pastas/:id
 * @access Private/admin
 */
exports.updatePasta = asyncHandler(async (req, res, next) => {
  const { number, name, ingredients, small_price, big_price } = req.body;
  const pasta = await Pasta.findByPk(req.params.id);
  pasta.number = number;
  pasta.name = name;
  pasta.ingredients = ingredients;
  pasta.small_price = small_price;
  pasta.big_price = big_price;
  await pasta.save();
  res.json(pasta);
});

/**
 * @desc delete pasta
 * @route DELETE products/pastas/:id
 * @access Private/admin
 */
exports.deletePasta = asyncHandler(async (req, res, next) => {
  const pasta = await Pasta.findByPk(req.params.id);
  await pasta.destroy();
  res.json({});
});
