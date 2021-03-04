const express = require('express');
const router = express.Router({ mergeParams: true });

const { addAddon, updateAddon, deleteAddon } = require('../controllers/addon');

const { protect, authorize } = require('../middleware/auth');

router.route('/').post(protect, authorize('admin'), addAddon);
router
  .route('/:id')
  .put(protect, authorize('admin'), updateAddon)
  .delete(protect, authorize('admin'), deleteAddon);

module.exports = router;
