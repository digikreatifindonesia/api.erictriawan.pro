const express = require('express');
const verifyToken = require('../middlewares/authMiddleware'); // Pastikan jalur benar

const router = express.Router();

// Admin-only route
router.get('/admin', verifyToken(['admin']), (req, res) => {
    res.json({ message: `Welcome, ${req.user.role}!` });
});

// Branch-only route
router.get('/branch', verifyToken(['branch']), (req, res) => {
    res.json({ message: `Welcome, ${req.user.role}!` });
});

// User-only route
router.get('/user', verifyToken(['customer']), (req, res) => {
    res.json({ message: `Welcome, ${req.user.role}!` });
});

// Fallback for undefined routes
router.all('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
});

module.exports = router;
