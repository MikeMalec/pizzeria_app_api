const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getBeverages,
  addBeverage,
  updateBeverage,
  deleteBeverage,
} = require('../controllers/beverage');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getBeverages)
  .post(protect, authorize('admin'), addBeverage);
router
  .route('/:id')
  .put(protect, authorize('admin'), updateBeverage)
  .delete(protect, authorize('admin'), deleteBeverage);

module.exports = router;
