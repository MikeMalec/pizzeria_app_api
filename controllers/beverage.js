const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { Beverage } = require('../models');

/**
 * @desc add beverage
 * @route products/beverages
 * @access Private/admin
 */
exports.getBeverages = asyncHandler(async (req, res, next) => {
  const beverages = await Beverage.findAll({ order: [['id', 'ASC']] });
  res.json(beverages);
});

/**
 * @desc add beverage
 * @route products/beverages
 * @access Private/admin
 */
exports.addBeverage = asyncHandler(async (req, res, next) => {
  const beverage = await Beverage.create(req.body);
  res.json(beverage);
});

/**
 * @desc update beverage
 * @route PUT products/beverage/:id
 * @access Private/admin
 */
exports.updateBeverage = asyncHandler(async (req, res, next) => {
  const {
    name,
    number,
    type,
    alcohol_type,
    size,
    small_price,
    big_price,
    price,
    ingredients,
    orderable,
  } = req.body;
  const beverage = await Beverage.findByPk(req.params.id);
  beverage.name = name;
  beverage.number = number;
  beverage.type = type;
  beverage.alcohol_type = alcohol_type;
  beverage.size = size;
  beverage.small_price = small_price;
  beverage.big_price = big_price;
  beverage.price = price;
  beverage.ingredients = ingredients;
  beverage.orderable = orderable;
  await beverage.save();
  res.json(beverage);
});

/**
 * @desc delete beverage
 * @route DELETE products/beverages/:id
 * @access Private/admin
 */
exports.deleteBeverage = asyncHandler(async (req, res, next) => {
  const beverage = await Beverage.findByPk(req.params.id);
  await beverage.destroy();
  res.json({});
});
