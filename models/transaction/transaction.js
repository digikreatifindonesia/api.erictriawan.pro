

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Transaction', {
        total_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        payment_method: {
            type: DataTypes.ENUM('cash', 'card', 'payment_gateway', 'EDC'),
            allowNull: false,
        },
        payment_status: {
            type: DataTypes.ENUM('pending', 'paid', 'failed'),
            defaultValue: 'pending',
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'completed', 'canceled'),
            defaultValue: 'pending',
            allowNull: false,
        },
        transaction_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false,
        },
        branch_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Branches',
                key: 'id',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        type: {
            type: DataTypes.ENUM('dine_in', 'takeaway', 'delivery'),
            allowNull: false,
        },
        // Optional fields for delivery transactions
        delivery_address: {
            type: DataTypes.STRING,
            allowNull: true, // Only for delivery transactions
        },
        delivery_fee: {
            type: DataTypes.FLOAT,
            allowNull: true, // Optional fee for delivery
        },
        tax: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        discount: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        coupon_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        coupon_discount: {
            type: DataTypes.FLOAT,
            allowNull: true, // Discount from coupon
        },
    });

};
