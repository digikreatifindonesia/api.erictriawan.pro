const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');


const LoyaltyPointsHistory = sequelize.define('LoyaltyPointsHistory', {
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
    orderId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pointsEarned: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    pointsRedeemed: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: DataTypes.STRING,
    },
}, {
    timestamps: true,
    tableName: 'loyalty_points_history',
});

module.exports = LoyaltyPointsHistory;
