const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.login);
router.get('/users', adminController.getUsers);
router.post('/activate-plan', adminController.activatePlan);
router.post('/approve-proof', adminController.approveProof);

module.exports = router;