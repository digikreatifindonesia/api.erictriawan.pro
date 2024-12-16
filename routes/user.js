// userRoutes.js

const express = require('express');
const verifyToken = require('../middlewares/authMiddleware'); // Pastikan middleware ini benar
const { getProfile, updateProfile } = require('../controllers/userController'); // Import controller
const router = express.Router();

// Get profile route
router.get('/profile', verifyToken(['customer', 'admin']), getProfile); // Middleware verifyToken untuk mengamankan akses

// Update profile route (sudah ada)
router.patch('/profile', verifyToken(['customer', 'admin']), updateProfile);

module.exports = router;
