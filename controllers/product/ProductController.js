const { Product, AddOnCategory, AddOn, Ingredient  } = require('../../models/index');  // Mengimpor model dari index.js

// Fungsi untuk menambahkan produk baru
const addProduct = async (req, res) => {
    const { name, description, price, addonCategories, ingredients } = req.body;

    try {
        // Menambahkan produk baru
        const newProduct = await Product.create({
            name,
            description,
            price
        });

        // Menambahkan kategori addon yang dipilih untuk produk
        if (addonCategories && Array.isArray(addonCategories)) {
            for (const addonCategory of addonCategories) {
                const category = await AddOnCategory.findByPk(addonCategory.categoryId);
                if (category) {
                    await newProduct.addAddonCategory(category);
                } else {
                    return res.status(404).json({
                        message: `AddOnCategory with ID ${addonCategory.categoryId} not found`
                    });
                }
            }
        }

        // Menambahkan ingredients ke produk
        if (ingredients && Array.isArray(ingredients)) {
            for (const ingredient of ingredients) {
                const ingredientInstance = await Ingredient.findByPk(ingredient.ingredientId);
                if (ingredientInstance) {
                    await newProduct.addIngredient(ingredientInstance);
                } else {
                    return res.status(404).json({
                        message: `Ingredient with ID ${ingredient.ingredientId} not found`
                    });
                }
            }
        }

        // Mengambil data produk dengan kategori addon dan ingredient terkait
        const productWithDetails = await Product.findOne({
            where: { id: newProduct.id },
            include: [
                {
                    model: AddOnCategory,
                    as: 'addonCategories',
                    include: {
                        model: AddOn,
                        as: 'addons'
                    }
                },
                {
                    model: Ingredient,
                    as: 'ingredients'
                }
            ]
        });

        res.status(201).json({
            message: 'Product added successfully',
            product: productWithDetails
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to add product',
            error: error.message
        });
    }
};


// Fungsi untuk mengambil semua produk
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: [
                {
                    model: AddOnCategory,
                    as: 'addonCategories',
                    include: {
                        model: AddOn,
                        as: 'addons'
                    }
                },
                {
                    model: Ingredient,
                    as: 'ingredients'
                }
            ]
        });

        res.status(200).json({
            message: 'Products fetched successfully',
            products: products
        });

    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch products',
            error: error.message
        });
    }
};


// Fungsi untuk mengambil produk berdasarkan ID
const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findOne({
            where: { id },
            include: [
                {
                    model: AddOnCategory,
                    as: 'addonCategories',
                    include: {
                        model: AddOn,
                        as: 'addons'
                    }
                },
                {
                    model: Ingredient,
                    as: 'ingredients'
                }
            ]
        });

        if (product) {
            res.status(200).json({
                message: 'Product fetched successfully',
                product: product
            });
        } else {
            res.status(404).json({
                message: 'Product not found'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch product',
            error: error.message
        });
    }
};

// Fungsi untuk memperbarui produk
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, addonCategories, ingredients } = req.body;

    try {
        const product = await Product.findByPk(id);

        if (product) {
            // Memperbarui produk
            await product.update({
                name,
                description,
                price
            });

            // Memperbarui kategori addon yang dipilih untuk produk
            if (addonCategories && Array.isArray(addonCategories)) {
                // Hapus kategori addon yang ada sebelum menambahkan yang baru
                await product.setAddonCategories([]); // Menghapus kategori addon yang sudah ada
                for (const addonCategory of addonCategories) {
                    const category = await AddOnCategory.findByPk(addonCategory.categoryId);

                    if (category) {
                        // Menyambungkan produk dengan kategori addon
                        await product.addAddonCategory(category);
                    } else {
                        return res.status(404).json({
                            message: `AddOnCategory with ID ${addonCategory.categoryId} not found`
                        });
                    }
                }
            }

            // Memperbarui ingredients yang terkait dengan produk
            if (ingredients && Array.isArray(ingredients)) {
                // Hapus ingredients yang ada sebelum menambahkan yang baru
                await product.setIngredients([]); // Menghapus ingredients yang sudah ada
                for (const ingredient of ingredients) {
                    const ingredientInstance = await Ingredient.findByPk(ingredient.ingredientId);

                    if (ingredientInstance) {
                        // Menyambungkan produk dengan ingredient
                        await product.addIngredient(ingredientInstance);
                    } else {
                        return res.status(404).json({
                            message: `Ingredient with ID ${ingredient.ingredientId} not found`
                        });
                    }
                }
            }

            // Mengambil data produk yang telah diperbarui dengan kategori addon dan ingredients
            const updatedProduct = await Product.findOne({
                where: { id: product.id },
                include: [
                    {
                        model: AddOnCategory,
                        as: 'addonCategories',
                        include: {
                            model: AddOn,
                            as: 'addons'
                        }
                    },
                    {
                        model: Ingredient,
                        as: 'ingredients'
                    }
                ]
            });

            res.status(200).json({
                message: 'Product updated successfully',
                product: updatedProduct
            });

        } else {
            res.status(404).json({
                message: 'Product not found'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to update product',
            error: error.message
        });
    }
};

// Fungsi untuk menghapus produk
const deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findByPk(id);

        if (product) {
            // Menghapus produk
            await product.destroy();
            res.status(200).json({
                message: 'Product deleted successfully'
            });
        } else {
            res.status(404).json({
                message: 'Product not found'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete product',
            error: error.message
        });
    }
};

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
};
