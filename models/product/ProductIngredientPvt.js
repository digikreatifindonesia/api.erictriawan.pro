module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "ProductIngredientPvt",
        {
            productId: DataTypes.INTEGER,
            ingredientId: DataTypes.INTEGER,
        },
        {}
    );
};