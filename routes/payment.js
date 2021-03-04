const express = require('express');
const router = express.Router();

const { stripeWebhook } = require('../controllers/payment');

router.route('/').post(stripeWebhook);

module.exports = router;
