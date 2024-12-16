// models/Unit.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Unit = sequelize.define('Unit', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        // unique: true,  // Pastikan satuan unit tidak duplikat
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,  // Deskripsi opsional
    },
});

module.exports = Unit;
