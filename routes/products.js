const express = require('express');
const router = express.Router();

const pizzaRouter = require('./pizza');
const burgerRouter = require('./burger');
const pastaRouter = require('./pasta');
const pitaRouter = require('./pita');
const saladRouter = require('./salad');
const beverageRouter = require('./beverage');
const addonRouter = require('./addons');
const sauceRouter = require('./sauces');

const { getProducts } = require('../controllers/products');

router.use('/pizzas', pizzaRouter);
router.use('/burgers', burgerRouter);
router.use('/pastas', pastaRouter);
router.use('/pitas', pitaRouter);
router.use('/salads', saladRouter);
router.use('/beverages', beverageRouter);
router.use('/pizzaAddons', addonRouter);
router.use('/sauces', sauceRouter);

router.route('/').get(getProducts);

module.exports = router;
