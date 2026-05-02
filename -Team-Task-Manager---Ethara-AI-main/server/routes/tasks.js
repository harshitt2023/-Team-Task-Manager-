const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const taskController = require('../controllers/taskController');

const router = express.Router();

// Protect all routes
router.use(authenticateToken);

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);

module.exports = router;