
module.exports = (sequelize, DataTypes) => {
    return  sequelize.define('Branch', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.JSON, // Ganti JSONB menjadi JSON untuk MySQL
        allowNull: false,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    branch_head: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    franchise_owner_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Users',
            key: 'id',
        },
    },
    franchise_start_date: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    is_franchise: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    franchise_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'Franchises',
            key: 'id',
        },
    },

    opening_hours: {
        type: DataTypes.JSON, // Format untuk jam operasional (misal: { "monday": "09:00-18:00", "tuesday": "09:00-18:00", ... })
        allowNull: true,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    }
});

};


