const express = require('express');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const { sequelize } = require('./models');
const dotenv = require('dotenv');

const { joinOrders } = require('./services/sockets/SocketManager');

dotenv.config({ path: './config/config.env' });

const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
global.io = io;

const productsRoutes = require('./routes/products');
const timeRoute = require('./routes/time');
const ordersRoutes = require('./routes/orders');
const authRoutes = require('./routes/auth');
const paymentRoutes = require('./routes/payment');
const users = require('./routes/user');

const stripe = require('stripe')(
  'sk_test_51IMUvjGE0YeYqRI7p2oKXc2QwE1Uk0DuJftM5dpa28Cu2YvGslbVtkRmFq3e7iIcf0vF9sLtRRJFmLoLMSZ3HFHf00fQUR22GI'
);
global.stripe = stripe;

app.use(express.json());

app.use(cors());

app.use('/auth', authRoutes);
app.use('/users', users);
app.use('/products', productsRoutes);
app.use('/time', timeRoute);
app.use('/orders', ordersRoutes);
app.use('/webhook', paymentRoutes);

app.use(errorHandler);

io.on('connection', (socket) => {
  console.log('NEW SOCKET');
  socket.on('JOIN_ORDERS', async (token) => {
    await joinOrders(socket, token);
  });
});

server.listen({ port: 3000 }, async () => {
  console.log('SERVER STARTED');
  let dbConnectRetries = 5;
  while (dbConnectRetries > 0) {
    try {
      await sequelize.authenticate();
      console.log('DB CONNECTED');
      break;
    } catch (error) {
      dbConnectRetries -= 1;
      await new Promise((res) => setTimeout(res, 5000));
    }
  }
});

process.on('unhandledRejection', (err, promise) => {
  console.log(`unhandled rejection ${err.message}`);
  // server.close(() => process.exit(1));
});
