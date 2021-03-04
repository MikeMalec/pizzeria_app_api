const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const {
  Beverage,
  Burger,
  Pasta,
  Pita,
  Pizza,
  Salad,
  PizzaAddon,
  Sauce,
} = require('../models');

/**
 * @desc get products
 * @route GET products
 * @access Public
 */
exports.getProducts = asyncHandler(async (req, res, next) => {
  const pizza = await Pizza.findAll({ order: [['id', 'ASC']] });
  const burger = await Burger.findAll({ order: [['id', 'ASC']] });
  const pasta = await Pasta.findAll({ order: [['id', 'ASC']] });
  const pita = await Pita.findAll({ order: [['id', 'ASC']] });
  const salad = await Salad.findAll({ order: [['id', 'ASC']] });
  const beverage = await Beverage.findAll({ order: [['id', 'ASC']] });
  const pizzaAddons = await PizzaAddon.findAll({ order: [['id', 'ASC']] });
  const sauces = await Sauce.findAll({ order: [['id', 'ASC']] });
  const products = {
    pizza,
    pizzaAddons,
    sauces,
    burger,
    pasta,
    pita,
    salad,
    beverage,
  };
  // await new Promise((res, rej) => setTimeout(res, 2000));
  res.json(products);
});
