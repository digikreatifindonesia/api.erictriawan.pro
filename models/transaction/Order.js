const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    },
    items: {
        type: DataTypes.JSON,
        allowNull: false
    },
    orderType: {
        type: DataTypes.ENUM('delivery', 'takeaway', 'dine-in'),
        allowNull: false
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: true, // Required only for delivery orders
    },
    status: {
        type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending'
    }
});

module.exports = Order;
