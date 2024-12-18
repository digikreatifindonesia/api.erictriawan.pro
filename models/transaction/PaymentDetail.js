

module.exports = (sequelize, DataTypes) => {
    return  sequelize.define('PaymentDetail', {
    transaction_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Transactions',
            key: 'id',
        },
    },
    method: {
        type: DataTypes.ENUM('cash', 'card', 'payment_gateway', 'EDC'),
        allowNull: false,
    },
    gateway: {
        type: DataTypes.STRING,
        allowNull: true, // Hanya untuk payment_gateway
    },
    provider: {
        type: DataTypes.STRING,
        allowNull: true, // Misal: Nama bank atau provider
    },
    payment_gateway_transaction_id: {
        type: DataTypes.STRING,
        allowNull: true, // ID transaksi untuk payment gateway
    },
    card_type: {
        type: DataTypes.ENUM('Debit', 'Credit'),
        allowNull: true, // Untuk EDC (Debit atau Credit)
    },
    bank: {
        type: DataTypes.STRING,
        allowNull: true, // Nama bank untuk EDC
    },
    reference_number: {
        type: DataTypes.STRING,
        allowNull: true, // Nomor referensi EDC
    },
});

// Relasi
};

