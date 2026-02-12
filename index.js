const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/plans', require('./plans'));
router.use('/tasks', require('./tasks'));
router.use('/wallet', require('./wallet'));
router.use('/admin', require('./admin'));

module.exports = router;