const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { Burger } = require('../models');

/**
 * @desc get all burgers
 * @route GET products/burgers
 * @access Private/admin
 */
exports.getBurgers = asyncHandler(async (req, res, next) => {
  const pizzas = await Burger.findAll({ order: [['id', 'ASC']] });
  res.json(pizzas);
});

/**
 * @desc add burger
 * @route products/burgers
 * @access Private/admin
 */
exports.addBurger = asyncHandler(async (req, res, next) => {
  const burger = await Burger.create(req.body);
  res.json(burger);
});

/**
 * @desc update burger
 * @route PUT products/burgers/:id
 * @access Private/admin
 */
exports.updateBurger = asyncHandler(async (req, res, next) => {
  const { number, name, ingredients, solo_price, set_price } = req.body;
  const burger = await Burger.findByPk(req.params.id);
  burger.number = number;
  burger.name = name;
  burger.ingredients = ingredients;
  burger.solo_price = solo_price;
  burger.set_price = set_price;
  await burger.save();
  res.json(burger);
});

/**
 * @desc delete burger
 * @route DELETE products/burgers/:id
 * @access Private/admin
 */
exports.deleteBurger = asyncHandler(async (req, res, next) => {
  const burger = await Burger.findByPk(req.params.id);
  await burger.destroy();
  res.json({});
});
