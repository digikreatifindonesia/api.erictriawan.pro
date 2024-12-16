const Unit = require('../models/Unit');

// Create Unit
exports.createUnit = async (req, res) => {
    const { name, description } = req.body;

    try {
        const unit = await Unit.create({ name, description });
        res.status(201).json({
            message: 'Unit created successfully',
            data: unit,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to create unit',
            error: error.message,
        });
    }
};

// Update Unit
exports.updateUnit = async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const unit = await Unit.findByPk(id);
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        unit.name = name || unit.name;
        unit.description = description || unit.description;

        await unit.save();

        res.status(200).json({
            message: 'Unit updated successfully',
            data: unit,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update unit',
            error: error.message,
        });
    }
};

// Delete Unit
exports.deleteUnit = async (req, res) => {
    const { id } = req.params;

    try {
        const unit = await Unit.findByPk(id);
        if (!unit) {
            return res.status(404).json({ message: 'Unit not found' });
        }

        await unit.destroy();

        res.status(200).json({
            message: 'Unit deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete unit',
            error: error.message,
        });
    }
};
