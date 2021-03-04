const {
  OrderFood,
  OrderPizza,
  PizzaAddon,
  Pizza,
  Sauce,
  Burger,
  Pasta,
  Pita,
  Salad,
  Beverage,
} = require('../../models');

const BOX_24_30_PRICE = 1.5;
const BOX_40_50_PRICE = 2;
const BOX_FOOD = 1;
const BREAD_STICKS_PRICE = 11;

exports.getOrderPrice = async function getOrderPrice(order) {
  let sum = 0;
  const orderPizzas = await OrderPizza.findAll({
    where: { order_id: order.id },
  });
  for (let orderPizza of orderPizzas) {
    sum += await calculatePizzaPrice(orderPizza);
  }
  const orderFoods = await OrderFood.findAll({ where: { order_id: order.id } });
  for (let orderFood of orderFoods) {
    sum += await calculateFoodPrice(orderFood);
  }
  sum = sum * 100;
  console.log(`SUM = ${sum}`);
  return sum;
};

async function calculatePizzaPrice(orderPizza) {
  let price = 0;
  const amount = orderPizza.amount;
  const size = orderPizza.pizza_size;

  const pizzaId = orderPizza.pizza_id;
  const pizza = await Pizza.findByPk(pizzaId);

  const addonsIds = orderPizza.addons;
  const addons = await PizzaAddon.findAll({ where: { id: addonsIds } });

  const sauceId = orderPizza.sauce_id;
  const sauceSize = orderPizza.sauce_size;
  const sauce = await Sauce.findByPk(sauceId);

  switch (size) {
    case 24:
      price += pizza.size_24_price;
      for (let addon of addons) {
        price += addon.price_24;
      }
      price += BOX_24_30_PRICE;
      break;
    case 30:
      price += pizza.size_30_price;
      for (let addon of addons) {
        price += addon.price_30;
      }
      price += BOX_24_30_PRICE;
      break;
    case 40:
      price += pizza.size_40_price;
      for (let addon of addons) {
        price += addon.price_40;
      }
      price += BOX_40_50_PRICE;
      break;
    case 50:
      price += pizza.size_50_price;
      for (let addon of addons) {
        price += addon.price_50;
      }
      price += BOX_40_50_PRICE;
      break;
  }

  if (sauceSize == 'small') {
    price += sauce.small_price;
  } else if (sauceSize == 'big') {
    price += sauce.big_price;
  }

  price = price * amount;

  if (orderPizza.breadsticks) {
    price += BREAD_STICKS_PRICE;
  }
  return price;
}

async function calculateFoodPrice(orderFood) {
  let price = 0;
  const amount = orderFood.amount;
  const size = orderFood.size;
  const foodId = orderFood.food_id;
  const foodType = orderFood.food_type;
  console.log(amount, size, foodId, foodType);
  switch (foodType) {
    case 'burger':
      const burger = await Burger.findByPk(foodId);
      console.log(burger);
      if (size == 'small') {
        console.log(burger.solo_price);
        price += burger.solo_price;
      } else if (size == 'big') {
        console.log(burger.solo_price);
        price += burger.set_price;
      }
      price += BOX_FOOD;
      break;
    case 'pasta':
      const pasta = await Pasta.findByPk(foodId);
      if (size == 'small') {
        price += pasta.small_price;
      } else if (size == 'big') {
        price += pasta.big_price;
      }
      price += BOX_FOOD;
      break;
    case 'pita':
      const pita = await Pita.findByPk(foodId);
      if (size == 'small') {
        price += pita.small_price;
      } else if (size == 'big') {
        price += pita.big_price;
      }
      price += BOX_FOOD;
      break;
    case 'salad':
      const salad = await Salad.findByPk(foodId);
      price += salad.price;
      price += BOX_FOOD;
      break;
    case 'beverage':
      const beverage = await Beverage.findByPk(foodId);
      price += beverage.price;
      break;
  }
  price = price * amount;
  return price;
}
