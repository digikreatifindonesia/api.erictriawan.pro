// models/TransactionProduct.js

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('TransactionProduct', {
        transaction_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Transactions',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Products',
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
    }, {
        tableName: 'transaction_products',
        timestamps: false, // If you don't want to track createdAt/updatedAt
    });
};
