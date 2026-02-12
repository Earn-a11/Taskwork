const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const auth = require('../middleware/auth');

router.get('/', auth, walletController.getWallet);
router.post('/withdraw', auth, walletController.withdraw);
router.post('/bank-details', auth, walletController.updateBankDetails);

module.exports = router;