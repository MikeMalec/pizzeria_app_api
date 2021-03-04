const { sequelize, User } = require('../models');

async function createUser(email, password) {
  console.log('CREATE USER');
  await sequelize.authenticate();
  await User.create({ email, password, user_type: 'admin' });
}

createUser('admin@123.com', 'admin123');
