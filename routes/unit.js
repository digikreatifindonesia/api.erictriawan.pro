const express = require('express');
const { createUnit, updateUnit, deleteUnit } = require('../controllers/unitController');
const verifyToken = require('../middlewares/authMiddleware'); // Pastikan hanya pengguna terotorisasi yang dapat mengakses
const checkRole = require('../middlewares/checkRole'); // Verifikasi role jika diperlukan

const router = express.Router();

// Create Unit (Admin Only)
router.post(
    '/',
    verifyToken(['admin']),
    checkRole(['admin']),
    createUnit
);

// Update Unit (Admin Only)
router.put(
    '/:id',
    verifyToken(['admin']),
    checkRole(['admin']),
    updateUnit
);

// Delete Unit (Admin Only)
router.delete(
    '/:id',
    verifyToken(['admin']),
    checkRole(['admin']),
    deleteUnit
);

module.exports = router;
