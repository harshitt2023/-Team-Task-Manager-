const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const userController = require('../controllers/userController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', userController.getUsers);

module.exports = router;