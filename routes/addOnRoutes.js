const express = require('express');
const { addAddOnCategory, addAddOn } = require('../controllers/product/AddOnController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// Menambahkan Kategori AddOn Baru (Hanya Admin)
router.post(
    '/add-category',
    verifyToken(['admin']),  // Memastikan hanya admin yang bisa akses
    checkRole(['admin']),
    addAddOnCategory
);

// Menambahkan AddOn Baru (Hanya Admin)
router.post(
    '/add',
    verifyToken(['admin']),
    checkRole(['admin']),
    addAddOn
);

module.exports = router;
