const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getAllPitas,
  addPita,
  updatePita,
  deletePita,
} = require('../controllers/pita');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getAllPitas)
  .post(protect, authorize('admin'), addPita);
router
  .route('/:id')
  .put(protect, authorize('admin'), updatePita)
  .delete(protect, authorize('admin'), deletePita);

module.exports = router;
