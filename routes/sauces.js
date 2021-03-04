const express = require('express');
const router = express.Router({ mergeParams: true });

const { addSauce, updateSauce, deleteSauce } = require('../controllers/sauce');

const { protect, authorize } = require('../middleware/auth');

router.route('/').post(protect, authorize('admin'), addSauce);
router
  .route('/:id')
  .put(protect, authorize('admin'), updateSauce)
  .delete(protect, authorize('admin'), deleteSauce);

module.exports = router;
