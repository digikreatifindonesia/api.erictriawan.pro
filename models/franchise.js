module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Franchise', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        franchise_owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Nama tabel atau model
                key: 'id',
            },
        },
        start_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        franchise_fee: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        franchise_agreement_details: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    });
};
