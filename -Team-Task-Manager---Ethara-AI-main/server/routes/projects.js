const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const projectController = require('../controllers/projectController');

const router = express.Router();
router.use(authenticateToken);

router.get('/', projectController.getProjects);
router.post('/', projectController.createProject);

module.exports = router;