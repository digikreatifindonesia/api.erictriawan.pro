const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const LoyaltyPoints = require('./loyalty/LoyaltyPoints');
const LoyaltyPointsHistory = require('./loyalty/LoyaltyPointsHistory');
const User = require('./auth/User');

// Import model
const Product = require('./product/Product')(sequelize, DataTypes);
const ProductCategory = require('./product/ProductCategory')(sequelize, DataTypes);
const AddOnCategory = require('./product/AddOnCategory')(sequelize, DataTypes);
const AddOn = require('./product/AddOn')(sequelize, DataTypes);
const Ingredient = require('./product/Ingredient')(sequelize, DataTypes);
const Branch = require('./branch/Branch')(sequelize, DataTypes);  // Perbaikan penamaan, konsisten dengan nama model
const Franchise = require('./Franchise')(sequelize, DataTypes); // Sesuaikan dengan penamaan model
const Transaction = require('./transaction/Transaction')(sequelize, DataTypes);  // Konsisten dengan nama file dan model
const PaymentDetail = require('./transaction/PaymentDetail')(sequelize, DataTypes);  // Konsisten dengan penamaan model
const TransactionProduct = require('./transaction/TransactionProduct')(sequelize,DataTypes);

// Ekspor objek sequelize dan semua model
module.exports = {
    sequelize,
    LoyaltyPoints,
    LoyaltyPointsHistory,
    User,
    Product,
    ProductCategory,
    AddOnCategory,
    AddOn,
    Ingredient,
    Branch,
    Franchise,
    Transaction,
    PaymentDetail,
    TransactionProduct
};


require('./associations');
