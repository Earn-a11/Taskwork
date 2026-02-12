const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', auth, taskController.getTasks);
router.post('/complete', auth, taskController.completeTask);
router.post('/upload-proof', auth, upload.single('proof'), taskController.uploadProof);

module.exports = router;