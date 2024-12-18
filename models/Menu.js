const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');


module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        branch_id: { type: DataTypes.INTEGER, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.DECIMAL, allowNull: false },
        available: { type: DataTypes.BOOLEAN, defaultValue: true }
    });
    return Menu;
};
