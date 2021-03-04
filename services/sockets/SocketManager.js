const { User } = require('../../models');
const jwt = require('jsonwebtoken');

exports.joinOrders = async function (socket, token) {
  try {
    let tk = token.split(' ')[1].trim();
    const decoded = jwt.verify(tk, process.env.JWT_SECRET);
    const user = await User.findByPk(decoded.id);
    if (user !== null) {
      console.log('NEW JOIN');
      socket.join('ORDERS');
    }
  } catch (err) {
    console.log(err);
  }
};
