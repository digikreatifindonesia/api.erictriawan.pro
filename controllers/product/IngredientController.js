const { Ingredient } = require('../../models/index');

/// Fungsi untuk menambahkan ingredient baru
const addIngredient = async (req, res) => {
    const { name, thumbnail, description, isAvailable } = req.body;

    if (!name || !thumbnail || !description || isAvailable === undefined) {
        return res.status(400).json({
            message: 'All fields are required',
        });
    }

    try {
        const newIngredient = await Ingredient.create({
            name,
            thumbnail,
            description,
            isAvailable,
        });

        res.status(201).json({
            message: 'Ingredient added successfully',
            ingredient: newIngredient,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add ingredient',
            error: error.message,
        });
    }
};

// Fungsi untuk mendapatkan semua ingredients
const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll();

        res.status(200).json({ ingredients });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch ingredients',
            error: error.message,
        });
    }
};

module.exports = {
    addIngredient,
    getAllIngredients,
};