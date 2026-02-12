const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const auth = require('../middleware/auth');

router.post('/buy', auth, planController.buyPlan);
router.post('/activate', auth, planController.activatePlan);

module.exports = router;