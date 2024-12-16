const express = require('express');
const { getUserPoints, earnPoints, redeemUserPoints } = require('../controllers/loyaltyController');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Rute untuk pengguna umum (user) mendapatkan saldo poin
router.get('/balance', verifyToken(['customer', 'admin']), getUserPoints);
// Rute untuk menambahkan poin (hanya untuk admin)
router.post('/earn', verifyToken(['admin']), earnPoints);
// Rute untuk menukarkan poin (hanya pengguna yang diizinkan)
router.post('/redeem', verifyToken(['customer', 'admin']), redeemUserPoints);


module.exports = router;
