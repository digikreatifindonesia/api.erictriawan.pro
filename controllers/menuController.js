const { Menu } = require('../models/menu');

// Create new menu item
exports.createMenu = async (req, res) => {
    try {
        const { name, price, branchId } = req.body;
        const menu = await Menu.create({ name, price, branchId });
        res.status(201).json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get menu for a specific branch
exports.getMenu = async (req, res) => {
    try {
        const { branchId } = req.params;
        const menu = await Menu.findAll({ where: { branchId } });
        res.status(200).json(menu);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
