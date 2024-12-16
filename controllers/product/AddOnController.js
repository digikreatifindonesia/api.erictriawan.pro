const { AddOnCategory, AddOn } = require('../../models/index');

// controllers/product/AddOnController.js

// Fungsi untuk menambahkan kategori AddOn baru
const addAddOnCategory = async (req, res) => {
    const { categoryName, description } = req.body;

    try {
        // Implementasikan logika untuk menyimpan kategori AddOn
        // Misalnya, menggunakan model AddOnCategory untuk menyimpan kategori
        const newCategory = await AddOnCategory.create({
            name: categoryName,
            description
        });

        res.status(201).json({
            message: 'AddOn Category added successfully',
            category: newCategory
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add AddOn category',
            error: error.message
        });
    }
};

// Fungsi untuk menambahkan AddOn baru
const addAddOn = async (req, res) => {
    const { name, categoryId, price } = req.body;

    try {
        // Implementasikan logika untuk menyimpan AddOn baru
        const newAddOn = await AddOn.create({
            name,
            categoryId,
            price
        });

        res.status(201).json({
            message: 'AddOn added successfully',
            addon: newAddOn
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to add AddOn',
            error: error.message
        });
    }
};

module.exports = { addAddOnCategory, addAddOn };

