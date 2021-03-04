const asyncHandler = require('../middleware/async');
const { getOrder } = require('../repository/orderRepository');
const { Order } = require('../models');

exports.stripeWebhook = asyncHandler(async (req, res, next) => {
  console.log(`REQ BODY TYPE ${req.body.type}`);
  console.log(req.body);
  const event = req.body.data.object;
  if (req.body.type === 'payment_intent.succeeded') {
    const order = await Order.findOne({
      where: {
        stripe_intent_id: event.id,
      },
    });
    order.payment_status = 'succeeded';
    await order.save();
    const orderForSocket = await getOrder(order.id);
    console.log(`EMIT NEW ORDER ${orderForSocket.orderInfo}`);
    global.io.to('ORDERS').emit('NEW_ORDER', orderForSocket);
  } else if (req.body.type === 'payment_intent.failed') {
    const failedOrder = await Order.findOne({
      where: {
        stripe_intent_id: event.id,
      },
    });
    failedOrder.payment_status = 'failed';
    await failedOrder.save();
  }
  res.send();
});
