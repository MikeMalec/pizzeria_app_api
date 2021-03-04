const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getPizzas,
  addPizza,
  updatePizza,
  deletePizza,
} = require('../controllers/pizza');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getPizzas)
  .post(protect, authorize('admin'), addPizza);
router
  .route('/:id')
  .put(protect, authorize('admin'), updatePizza)
  .delete(protect, authorize('admin'), deletePizza);

module.exports = router;
