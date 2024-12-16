const express = require('express');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute yang hanya bisa diakses oleh admin
router.get('/dashboard', verifyToken(['admin']), (req, res) => {
    res.json({ message: 'Welcome to the Admin Dashboard' });
});

module.exports = router;
