const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getBurgers,
  addBurger,
  updateBurger,
  deleteBurger,
} = require('../controllers/burger');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getBurgers)
  .post(protect, authorize('admin'), addBurger);
router
  .route('/:id')
  .put(protect, authorize('admin'), updateBurger)
  .delete(protect, authorize('admin'), deleteBurger);

module.exports = router;
