const express = require('express');
const {
    createTransaction,
    getTransactions,
    getTransactionById,
    updateTransaction,
    deleteTransaction
} = require('../controllers/transactionController');
const checkRole = require('../middlewares/checkRole');
const verifyToken = require('../middlewares/authMiddleware');
const router = express.Router();

// Logging untuk memeriksa apakah route file berhasil di-load
console.log('Transaction Routes Loaded');

// Create a new transaction
router.post(
    '/create',
    (req, res, next) => {
        console.log('Incoming request to /create');
        next();
    },
    verifyToken(['staff', 'customer']),
    (req, res, next) => {
        console.log('Token verified, proceeding to role check');
        next();
    },
    createTransaction
);

// Get all transactions (admin can see all, branch_owner only sees their own transactions)
router.get(
    '/',
    (req, res, next) => {
        console.log('Incoming request to /');
        next();
    },
    verifyToken(['admin', 'branch_owner', 'staff', 'customer']),
    (req, res, next) => {
        console.log('Token verified, proceeding to role check');
        next();
    },
    getTransactions
);

// Get transaction by ID
router.get(
    '/:transactionId',
    (req, res, next) => {
        console.log('Incoming request to /:transactionId');
        next();
    },
    verifyToken(['admin', 'branch_owner', 'staff', 'customer']),
    (req, res, next) => {
        console.log('Token verified, proceeding to role check');
        next();
    },
    getTransactionById
);

// Update an existing transaction
router.put(
    '/:transactionId',
    (req, res, next) => {
        console.log('Incoming request to /:transactionId/update');
        next();
    },
    verifyToken(['admin', 'branch_owner', 'staff']),
    (req, res, next) => {
        console.log('Token verified, proceeding to role check');
        next();
    },
    updateTransaction
);

// Delete a transaction
router.delete(
    '/:transactionId',
    (req, res, next) => {
        console.log('Incoming request to /:transactionId/delete');
        next();
    },
    verifyToken(['admin', 'branch_owner']),
    (req, res, next) => {
        console.log('Token verified, proceeding to role check');
        next();
    },
    deleteTransaction
);

module.exports = router;
