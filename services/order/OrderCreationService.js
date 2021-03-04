const { Order, OrderPizza, OrderFood } = require('../../models');

exports.createOrder = async function (req) {
  const {
    streetName,
    houseNumber,
    cityName,
    phoneNumber,
    paymentMethod,
  } = req.body.userInfo;
  let ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
  let userAgent = req.headers['user-agent'];
  const additionalInfo = `ip:${ip},userAgent:${userAgent}`;
  let paymentType;
  if (paymentMethod == 'Gotówka') {
    paymentType = 'cash';
  } else {
    paymentType = 'cart';
  }

  const order = await Order.create({
    user_id: req.user.id,
    street: streetName,
    house_number: houseNumber,
    city: cityName,
    phone_number: phoneNumber,
    additional_user_info: additionalInfo,
    payment_method: paymentType,
    payment_status: 'processing',
  });
  await createOrderPizza(order, req);
  await createOrderFood(order, req);
  return order;
};

async function createOrderPizza(order, req) {
  const { pizza: pizzas } = req.body;
  for (let pizzaInfo of pizzas) {
    const pizza = pizzaInfo.pizza;
    await OrderPizza.create({
      order_id: order.id,
      pizza_id: pizza.id,
      pizza_size: pizzaInfo.size,
      addons:
        pizzaInfo.addons.length > 1
          ? pizzaInfo.addons.map((addon) => parseInt(addon.id))
          : [],
      sauce_id: pizzaInfo.sauce ? pizzaInfo.sauce.id : null,
      sauce_size: pizzaInfo.sauceSize ? pizzaInfo.sauceSize.size : null,
      breadsticks: pizzaInfo.breadSticks,
      amount: pizzaInfo.amount,
    });
  }
}

async function createOrderFood(order, req) {
  const { burger, pasta, pita, salad, beverage } = req.body;
  await createOrderBurger(order, burger);
  await createOrderPasta(order, pasta);
  await createOrderPita(order, pita);
  await createOrderSalad(order, salad);
  await createOrderBeverage(order, beverage);
}

async function createOrderBurger(order, burgers) {
  for (let burgerInfo of burgers) {
    const burger = burgerInfo.burger;
    let size = burgerInfo.type;
    if (size === 'solo') {
      size = 'small';
    } else {
      size = 'big';
    }
    await OrderFood.create({
      order_id: order.id,
      food_id: burger.id,
      food_type: 'burger',
      size,
      amount: burgerInfo.amount,
    });
  }
}

async function createOrderPasta(order, pastas) {
  for (let pastaInfo of pastas) {
    const pasta = pastaInfo.pasta;
    let size = pasta.type;
    if (size === 'small') {
      size = 'small';
    } else {
      size = 'big';
    }
    await OrderFood.create({
      order_id: order.id,
      food_id: pasta.id,
      food_type: 'pasta',
      size,
      amount: pastaInfo.amount,
    });
  }
}

async function createOrderPita(order, pitas) {
  for (let pitaInfo of pitas) {
    const pita = pitaInfo.pita;
    let size = pita.type;
    if (size === 'small') {
      size = 'small';
    } else {
      size = 'big';
    }
    await OrderFood.create({
      order_id: order.id,
      food_id: pita.id,
      food_type: 'pita',
      size,
      amount: pitaInfo.amount,
    });
  }
}

async function createOrderSalad(order, salads) {
  for (let saladInfo of salads) {
    const salad = saladInfo.salad;
    await OrderFood.create({
      order_id: order.id,
      food_id: salad.id,
      food_type: 'salad',
      size: 'normal',
      amount: saladInfo.amount,
    });
  }
}

async function createOrderBeverage(order, beverages) {
  for (let beverageInfo of beverages) {
    const beverage = beverageInfo.beverage;
    await OrderFood.create({
      order_id: order.id,
      food_id: beverage.id,
      food_type: 'beverage',
      size: 'normal',
      amount: beverageInfo.amount,
    });
  }
}
