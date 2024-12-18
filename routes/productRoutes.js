// routes/productRoutes.js
const express = require('express');
const { addProduct, getAllProducts, getProductById, updateProduct, deleteProduct } = require('../controllers/product/ProductController');
const verifyToken = require('../middlewares/authMiddleware'); // Memastikan hanya pengguna terotorisasi yang dapat mengakses
const checkRole = require('../middlewares/checkRole'); // Verifikasi peran jika diperlukan

const router = express.Router();

// Menambahkan Produk Baru (Hanya Admin)
router.post(
    '/create',
    verifyToken(['admin']),  // Verifikasi token dan peran admin
    checkRole(['admin']),
    addProduct
);
 // Menambahkan produk baru
router.get('/', verifyToken(['admin','customer']),  // Verifikasi token dan peran admin
    checkRole(['admin']),getAllProducts);         // Mengambil semua produk
router.get('/:id',verifyToken(['admin','customer']),  // Verifikasi token dan peran admin
    checkRole(['admin']), getProductById);     // Mengambil produk berdasarkan ID
router.put('/:id', verifyToken(['admin']),  // Verifikasi token dan peran admin
    checkRole(['admin']),updateProduct);      // Memperbarui produk
router.delete('/:id',verifyToken(['admin']),  // Verifikasi token dan peran admin
    checkRole(['admin']), deleteProduct);   // Menghapus produk

module.exports = router;
