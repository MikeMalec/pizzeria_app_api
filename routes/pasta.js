const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getAllPasta,
  addPasta,
  updatePasta,
  deletePasta,
} = require('../controllers/pasta');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getAllPasta)
  .post(protect, authorize('admin'), addPasta);
router
  .route('/:id')
  .put(protect, authorize('admin'), updatePasta)
  .delete(protect, authorize('admin'), deletePasta);

module.exports = router;
