const express = require('express');
const router = express.Router();

const { getUserOrders } = require('../controllers/orders');

const { protect } = require('../middleware/auth');

router.route('/orders').get(protect, getUserOrders);

module.exports = router;
