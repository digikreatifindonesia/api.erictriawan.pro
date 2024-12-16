// seeders/20231201000100-coffee-shop-units.js
const { Unit } = require('../models/unit');

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Unit.bulkCreate([
            { name: 'g', description: 'Gram' },
            { name: 'kg', description: 'Kilogram' },
            { name: 'ml', description: 'Milliliter' },
            { name: 'liter', description: 'Liter' },
            { name: 'cup', description: 'Cangkir' },
            { name: 'glass', description: 'Gelas' },
            { name: 'shot', description: 'Shot (untuk espresso)' },
            { name: 'pack', description: 'Paket' },
            { name: 'box', description: 'Kotak' },
            { name: 'bag', description: 'Tas/Kantong' },
            { name: 'bottle', description: 'Botol' },
            { name: 'can', description: 'Kaleng' },
            { name: 'sachet', description: 'Sachet' },
            { name: 'pcs', description: 'Pieces (Potongan)' },
            { name: 'roll', description: 'Gulungan' },
            { name: 'sheet', description: 'Lembar' },
            { name: 'stick', description: 'Batang (Stick)' },
            { name: 'bar', description: 'Batang (Bar cokelat)' },
        ]);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Units', null, {});
    }
};
