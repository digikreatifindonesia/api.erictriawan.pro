const { User, LoyaltyPoints, LoyaltyPointsHistory, Product, AddOnCategory, AddOn, Ingredient, Branch, Franchise, Transaction, PaymentDetail,TransactionProduct } = require('./index'); // pastikan semua model sudah diimport sebelumnya

// Relasi antara User dan LoyaltyPoints
User.hasOne(LoyaltyPoints, { foreignKey: 'userId' });
LoyaltyPoints.belongsTo(User, { foreignKey: 'userId' });

// Relasi antara User dan LoyaltyPointsHistory
User.hasMany(LoyaltyPointsHistory, { foreignKey: 'userId' });
LoyaltyPointsHistory.belongsTo(User, { foreignKey: 'userId' });

// Menghubungkan relasi antar model
Product.hasMany(AddOnCategory, { foreignKey: 'productId', as: 'addonCategories' });
AddOnCategory.belongsTo(Product, { foreignKey: 'productId' });

AddOnCategory.hasMany(AddOn, { foreignKey: 'addOnCategoryId', as: 'addons' });
AddOn.belongsTo(AddOnCategory, { foreignKey: 'addOnCategoryId' });

Product.belongsToMany(Ingredient, {through: "ProductIngredients", as: "ingredients", foreignKey: "productId"});
Ingredient.belongsToMany(Product, {through: "ProductIngredients", as: "products", foreignKey: "ingredientId"});

// Relasi Branch
Branch.belongsTo(User, { foreignKey: 'owner_id', as: 'owner' });
Branch.belongsTo(User, { foreignKey: 'franchise_owner_id', as: 'franchiseOwner' });
Branch.belongsTo(Franchise, { foreignKey: 'franchise_id', as: 'franchise' });

// Relasi Branch dan Produk serta Transaksi
Branch.hasMany(Product, { foreignKey: 'branch_id', as: 'products' });
Branch.hasMany(Transaction, { foreignKey: 'branch_id', as: 'transactions' });

Franchise.belongsTo(User, { foreignKey: 'franchise_owner_id', as: 'franchiseOwner' });

Transaction.belongsTo(Branch, { foreignKey: 'branch_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });
Transaction.hasOne(PaymentDetail, { foreignKey: 'transaction_id' });
PaymentDetail.belongsTo(Transaction, { foreignKey: 'transaction_id' });

// models/Transaction.js

Transaction.belongsToMany(Product, { through: 'transaction_products', foreignKey: 'transaction_id' });
Product.belongsToMany(Transaction, { through: 'transaction_products', foreignKey: 'product_id' });
TransactionProduct.belongsTo(Transaction, {
    foreignKey: 'transaction_id',
    as: 'transaction',
});
TransactionProduct.belongsTo(Product, {
    foreignKey: 'product_id',
    as: 'product',});
