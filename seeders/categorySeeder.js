const ProductCategory = require('../models/product/productCategoryModels');

async function seedCategories() {
    try {
        const categories = [
            { name: 'Beverages', description: 'Drinks like coffee, tea, and juices' },
            { name: 'Snacks', description: 'Light snacks and pastries' },
            { name: 'Merchandise', description: 'Products like mugs, T-shirts, and more' },
        ];

        await ProductCategory.bulkCreate(categories);

        console.log('Categories seeded successfully');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
}

module.exports = seedCategories;
