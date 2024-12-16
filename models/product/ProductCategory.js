module.exports = (sequelize, DataTypes) => {
    return sequelize.define('ProductCategory', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });
};
