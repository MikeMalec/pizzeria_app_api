const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { Pizza } = require('../models');

/**
 * @desc get all pizzas
 * @route GET products/pizzas
 * @access Private/admin
 */
exports.getPizzas = asyncHandler(async (req, res, next) => {
  const pizzas = await Pizza.findAll({ order: [['id', 'ASC']] });
  res.json(pizzas);
});

/**
 * @desc add pizza
 * @route POST products/pizzas
 * @access Private/admin
 */
exports.addPizza = asyncHandler(async (req, res, next) => {
  const pizza = await Pizza.create(req.body);
  res.json(pizza);
});

/**
 * @desc update pizza
 * @route PUT products/pizzas/:id
 * @access Private/admin
 */
exports.updatePizza = asyncHandler(async (req, res, next) => {
  const {
    number,
    name,
    ingredients,
    size_24_price,
    size_30_price,
    size_40_price,
    size_50_price,
  } = req.body;
  const pizza = await Pizza.findByPk(req.params.id);
  pizza.number = number;
  pizza.name = name;
  pizza.ingredients = ingredients;
  pizza.size_24_price = size_24_price;
  pizza.size_30_price = size_30_price;
  pizza.size_40_price = size_40_price;
  pizza.size_50_price = size_50_price;
  await pizza.save();
  res.json(pizza);
});

/**
 * @desc delete pizza
 * @route DELETE products/pizzas/:id
 * @access Private/admin
 */
exports.deletePizza = asyncHandler(async (req, res, next) => {
  const pizza = await Pizza.findByPk(req.params.id);
  await pizza.destroy();
  res.json({});
});
