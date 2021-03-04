const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { Pita } = require('../models');

/**
 * @desc get all pitas
 * @route products/pitas
 * @access Private/admin
 */
exports.getAllPitas = asyncHandler(async (req, res, next) => {
  const pitas = await Pita.findAll({ order: [['id', 'ASC']] });
  res.json(pitas);
});

/**
 * @desc add pita
 * @route products/pitas
 * @access Private/admin
 */
exports.addPita = asyncHandler(async (req, res, next) => {
  const pita = await Pita.create(req.body);
  res.json(pita);
});

/**
 * @desc update pita
 * @route PUT products/pitas/:id
 * @access Private/admin
 */
exports.updatePita = asyncHandler(async (req, res, next) => {
  const { number, name, ingredients, small_price, big_price } = req.body;
  const pita = await Pita.findByPk(req.params.id);
  pita.number = number;
  pita.name = name;
  pita.ingredients = ingredients;
  pita.small_price = small_price;
  pita.big_price = big_price;
  await pita.save();
  res.json(pita);
});

/**
 * @desc delete pita
 * @route DELETE products/pitas/:id
 * @access Private/admin
 */
exports.deletePita = asyncHandler(async (req, res, next) => {
  const pita = await Pita.findByPk(req.params.id);
  await pita.destroy();
  res.json({});
});
