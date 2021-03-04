const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getSalads,
  addSalad,
  updateSalad,
  deleteSalad,
} = require('../controllers/salad');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getSalads)
  .post(protect, authorize('admin'), addSalad);
router
  .route('/:id')
  .put(protect, authorize('admin'), updateSalad)
  .delete(protect, authorize('admin'), deleteSalad);

module.exports = router;
