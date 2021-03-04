const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/ErrorResponse');
const { createOrder } = require('../services/order/OrderCreationService');
const { getOrderPrice } = require('../services/order/OrderPriceService');
const {
  getNewOrders,
  getAllOrdersExceptNew,
  getFilteredOrdersExceptNew,
  getUserAcceptedOrders,
} = require('../repository/orderRepository');
const { Time, Order } = require('../models');

/**
 * @desc create order
 * @route POST orders
 * @access Public
 */
exports.createOrder = asyncHandler(async (req, res, next) => {
  // TODO !!
  // await new Promise((res) => setTimeout(res, 2000));
  // let validTime = true;
  // if (!validTime) {
  //   return next(new ErrorResponse('Za późno na złożenie zamówienia'));
  // }
  const { streetName, houseNumber, cityName, phoneNumber } = req.body.userInfo;
  const order = await createOrder(req);
  const orderPrice = await getOrderPrice(order);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: orderPrice,
    currency: 'pln',
    metadata: {
      ulica: streetName,
      numer_domu: houseNumber,
      miasto: cityName,
      numer_telefonu: phoneNumber,
    },
  });
  order.stripe_intent_id = paymentIntent.id;
  order.price = orderPrice;
  await order.save();
  const time = await Time.findByPk(1);
  res.json({ time: time.time, clientSecret: paymentIntent.client_secret });
});

/**
 * @desc get new orders
 * @route GET orders (?status=new,accepted,canceled)
 * @access PRIVATE ADMIN
 */
exports.getOrders = asyncHandler(async (req, res, next) => {
  let orders;
  if (req.query.query) {
    orders = await getFilteredOrdersExceptNew(req);
  } else {
    if (req.query.type == 'new') {
      orders = await getNewOrders(req);
    } else if (req.query.type == 'old') {
      orders = await getAllOrdersExceptNew(req);
    }
  }
  res.json(orders);
});

/**
 * @desc get user accepted orders
 * @route GET users/orders
 * @access PRIVATE USER
 */
exports.getUserOrders = asyncHandler(async (req, res, next) => {
  const orders = await getUserAcceptedOrders(req);
  res.json(orders);
});

/**
 * @desc Set status of order (accepted,canceled)
 * @route PUT orders/:id
 * @access PRIVATE ADMIN
 */
exports.setOrderStatus = asyncHandler(async (req, res, next) => {
  const status = req.query.status;
  const order = await Order.findByPk(req.params.id);
  order.status = status;
  await order.save();
  res.json({ success: true });
});
