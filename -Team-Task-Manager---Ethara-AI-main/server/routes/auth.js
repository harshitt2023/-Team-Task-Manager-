const express = require('express');
const authController = require('../controllers/authController');  // ✅ Import
const { authenticateToken } = require('../middleware/auth');    // ✅ Import

const router = express.Router();

// Signup
router.post('/signup', authController.signup);

// Login  
router.post('/login', authController.login);

// Get current user (protected)
router.get('/me', authenticateToken, authController.getMe);

// Test user (temporary - delete after testing)
router.post('/test-user', authController.createTestUser);

module.exports = router;  // ✅ Export router