module.exports = (sequelize, DataTypes) => {
    return sequelize.define('AddOnCategory', {
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
