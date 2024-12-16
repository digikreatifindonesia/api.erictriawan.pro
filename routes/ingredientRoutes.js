const express = require('express');
const { addIngredient, getAllIngredients} = require('../controllers/product/IngredientController');
const verifyToken = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// Menambahkan Ingredient
router.post(
    '/create',
    verifyToken(['admin']),
    checkRole(['admin']),
    addIngredient
);

// Menambahkan AddOn Baru (Hanya Admin)
router.get(
    '/',
    verifyToken(['admin','customer']),
    checkRole(['admin','customer']),
    getAllIngredients
);

module.exports = router;
