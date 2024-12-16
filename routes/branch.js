// routes/branchRoutes.js
const express = require('express');
const { createBranch, getBranches,getBranchById } = require('../controllers/branchController');
const checkRole = require('../middlewares/checkRole');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Admin bisa menambah cabang
router.post('/create',
    verifyToken(['admin']),  // Token harus valid dan role harus admin
    checkRole(['admin']),    // Pastikan hanya admin yang bisa akses
    (req, res) => {
        console.log('Creating branch...');
        createBranch(req, res); // Panggil controller untuk membuat branch
    }
);
// router.post(
//     '/create',
//     // verifyToken,
//     // checkRole(['admin']),
//     // createBranch
// );

// Semua user bisa melihat cabang mereka (admin bisa melihat semua cabang)
router.get(
    '/',
    verifyToken(['admin', 'branch_owner']), // Hanya admin dan branch_owner yang bisa melihat
    checkRole(['admin', 'branch_owner']),    // Pastikan hanya admin dan branch_owner yang bisa akses
    getBranches // Panggil controller untuk mengambil cabang
);


router.get(
    '/:id',
    verifyToken(['admin', 'branch_owner']),  // Hanya admin dan branch_owner yang bisa melihat
    checkRole(['admin', 'branch_owner']),    // Pastikan hanya admin dan branch_owner yang bisa akses
    getBranchById // Panggil controller untuk mengambil cabang berdasarkan ID
);

module.exports = router;
