const express = require('express');
const router = express.Router();

const { setTime, getTime } = require('../controllers/time');

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin'), getTime)
  .post(protect, authorize('admin'), setTime);

module.exports = router;
