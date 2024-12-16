// models/loyalty/LoyaltyPoints.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');  // Pastikan ini mengarah ke file yang tepat

const LoyaltyPoints = sequelize.define('LoyaltyPoints', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    pointsBalance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    timestamps: true,
    tableName: 'loyalty_points',
});

module.exports = LoyaltyPoints;
