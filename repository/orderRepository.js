const { Op } = require('sequelize');
const { Order, OrderPizza, OrderFood, PizzaAddon } = require('../models');

exports.getOrders = async function (req) {
  const status = req.query.status;
  const lastFetched = req.query.lastFetched || null;
  const orders = await Order.findAll({
    where:
      lastFetched !== null
        ? {
            status: status,
            createdAt: { [Op.gt]: lastFetched },
          }
        : {
            status: status,
          },
    order: [['createdAt', 'ASC']],
    limit: 40,
    include: [
      {
        model: OrderPizza,
        as: 'pizza',
        include: ['pizza', 'sauce'],
      },
      {
        model: OrderFood,
        as: 'food',
      },
    ],
  });
  return await getOrdersFood(orders);
};

exports.getAllOrdersExceptNew = async function (req) {
  const lastFetched = req.query.lastFetched || null;
  const results = await Order.count({
    where: { status: { [Op.or]: ['accepted', 'canceled'] } },
  });
  const orders = await Order.findAll({
    where:
      lastFetched !== null
        ? {
            status: { [Op.or]: ['accepted', 'canceled'] },
            updatedAt: { [Op.lt]: lastFetched },
          }
        : {
            status: { [Op.or]: ['accepted', 'canceled'] },
          },
    order: [['updatedAt', 'DESC']],
    limit: 20,
    include: [
      {
        model: OrderPizza,
        as: 'pizza',
        include: ['pizza', 'sauce'],
      },
      {
        model: OrderFood,
        as: 'food',
      },
    ],
  });
  const ordersWithFood = await getOrdersFood(orders);
  return { orders: ordersWithFood, results };
};

exports.getFilteredOrdersExceptNew = async function (req) {
  const lastFetched = req.query.lastFetched || null;
  const query = req.query.query;
  const results = await Order.count({
    where: {
      [Op.and]: [
        { status: { [Op.or]: ['accepted', 'canceled'] } },
        {
          [Op.or]: [
            { street: { [Op.like]: `%${query}%` } },
            { house_number: { [Op.like]: `%${query}%` } },
            { city: { [Op.like]: `%${query}%` } },
            { phone_number: { [Op.like]: `%${query}%` } },
          ],
        },
      ],
    },
  });
  const orders = await Order.findAll({
    where:
      lastFetched !== null
        ? {
            [Op.and]: [
              { status: { [Op.or]: ['accepted', 'canceled'] } },
              {
                [Op.or]: [
                  { street: { [Op.like]: `%${query}%` } },
                  { house_number: { [Op.like]: `%${query}%` } },
                  { city: { [Op.like]: `%${query}%` } },
                  { phone_number: { [Op.like]: `%${query}%` } },
                ],
              },
            ],
            updatedAt: { [Op.lt]: lastFetched },
          }
        : {
            [Op.and]: [
              { status: { [Op.or]: ['accepted', 'canceled'] } },
              {
                [Op.or]: [
                  { street: { [Op.like]: `%${query}%` } },
                  { house_number: { [Op.like]: `%${query}%` } },
                  { city: { [Op.like]: `%${query}%` } },
                  { phone_number: { [Op.like]: `%${query}%` } },
                ],
              },
            ],
          },
    order: [['updatedAt', 'DESC']],
    limit: 20,
    include: [
      {
        model: OrderPizza,
        as: 'pizza',
        include: ['pizza', 'sauce'],
      },
      {
        model: OrderFood,
        as: 'food',
      },
    ],
  });
  const ordersWithFood = await getOrdersFood(orders);
  return { orders: ordersWithFood, results };
};

exports.getNewOrders = async function (req) {
  const orders = await Order.findAll({
    where: {
      payment_status: 'succeeded',
      status: 'new',
    },
    order: [['createdAt', 'ASC']],
    include: [
      {
        model: OrderPizza,
        as: 'pizza',
        include: ['pizza', 'sauce'],
      },
      {
        model: OrderFood,
        as: 'food',
      },
    ],
  });
  const ordersWithFood = await getOrdersFood(orders);
  return { orders: ordersWithFood, results: 0 };
};

exports.getUserAcceptedOrders = async function (req) {
  const lastFetched = req.query.lastFetched || null;
  const results = await Order.count({
    where: {
      user_id: req.user.id,
      payment_status: 'succeeded',
    },
  });
  const orders = await Order.findAll({
    where:
      lastFetched === null
        ? {
            user_id: req.user.id,
            payment_status: 'succeeded',
          }
        : {
            user_id: req.user.id,
            payment_status: 'succeeded',
            createdAt: { [Op.lt]: lastFetched },
          },
    order: [['createdAt', 'DESC']],
    limit: 6,
    include: [
      {
        model: OrderPizza,
        as: 'pizza',
        include: ['pizza', 'sauce'],
      },
      {
        model: OrderFood,
        as: 'food',
      },
    ],
  });
  const ordersWithFood = await getOrdersFood(orders);
  return { orders: ordersWithFood, results };
};

exports.getOrder = async function (id) {
  const order = await Order.findOne({
    where: { id },
    include: [
      {
        model: OrderPizza,
        as: 'pizza',
        include: ['pizza', 'sauce'],
      },
      {
        model: OrderFood,
        as: 'food',
      },
    ],
  });
  console.log(`ORDER = ${order}`);
  const ordersWithFood = await getOrdersFood([order]);
  return ordersWithFood[0];
};

async function getOrdersFood(orders) {
  const ordersWithFood = [];
  for (let order of orders) {
    const burgers = [];
    const pastas = [];
    const pitas = [];
    const salads = [];
    const beverages = [];
    const pizzas = [];
    for (let food of order.food) {
      switch (food.food_type) {
        case 'burger':
          const burger = await food.getBurger();
          burgers.push({ ...food.dataValues, ...burger.dataValues });
          break;
        case 'pasta':
          const pasta = await food.getPasta();
          pastas.push({ ...food.dataValues, ...pasta.dataValues });
          break;
        case 'pita':
          const pita = await food.getPita();
          pitas.push({ ...food.dataValues, ...pita.dataValues });
          break;
        case 'salad':
          const salad = await food.getSalad();
          salads.push({ ...food.dataValues, ...salad.dataValues });
          break;
        case 'beverage':
          const beverage = await food.getBeverage();
          beverages.push({ ...food.dataValues, ...beverage.dataValues });
          break;
      }
    }
    for (let pizzaInfo of order.pizza) {
      const pizza = { ...pizzaInfo.dataValues };
      const addons = [];
      for (let addonId of pizza.addons) {
        const addon = await PizzaAddon.findByPk(addonId);
        addons.push(addon);
      }
      pizza['addons'] = addons;
      pizzas.push(pizza);
    }
    ordersWithFood.push({
      orderInfo: {
        id: order.id,
        status: order.status,
        street: order.street,
        houseNumber: order.house_number,
        city: order.city,
        phoneNumber: order.phone_number,
        price: order.price,
        additionalUserInfo: order.additional_user_info,
        payment_method: order.payment_method,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      },
      pizzas,
      burgers,
      pastas,
      pitas,
      salads,
      beverages,
    });
  }
  return ordersWithFood;
}
