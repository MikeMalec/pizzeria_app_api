const express = require('express');
const router = express.Router();
const { login, register, logout, refresh } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/logout').post(protect, logout);
router.route('/refresh').post(protect, refresh);

module.exports = router;
