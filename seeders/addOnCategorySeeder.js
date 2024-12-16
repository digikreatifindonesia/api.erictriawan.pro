const ProductAddOnCategory = require('../models/product/productAddOnCategoryModels');

const addAddOnCategories = async () => {
    try {
        const categories = [
            { name: 'Topping', description: 'Kategori untuk topping tambahan seperti caramel, chocolate, dll.' },
            { name: 'Syrup', description: 'Kategori untuk sirup tambahan seperti vanilla, hazelnut, dll.' },
            { name: 'Milk', description: 'Kategori untuk opsi susu seperti soy milk, almond milk, dll.' },
            { name: 'Shot', description: 'Kategori untuk tambahan shot espresso.' },
        ];

        // Periksa apakah kategori sudah ada
        for (const category of categories) {
            const [categoryInstance, created] = await ProductAddOnCategory.findOrCreate({
                where: { name: category.name },
                defaults: category,
            });

            if (created) {
                console.log(`Category ${category.name} added successfully.`);
            } else {
                console.log(`Category ${category.name} already exists.`);
            }
        }
    } catch (error) {
        console.error('Error adding product add-on categories:', error);
    }
};

module.exports = addAddOnCategories;
