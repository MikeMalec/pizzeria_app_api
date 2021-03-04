const express = require('express');
const router = express.Router();

const {
  createOrder,
  getOrders,
  setOrderStatus,
} = require('../controllers/orders');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getOrders)
  .post(protect, createOrder);
router.route('/:id').put(protect, authorize('admin'), setOrderStatus);

module.exports = router;
