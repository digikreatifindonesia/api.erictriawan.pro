const { Transaction, PaymentDetail, User, Branch, Product } = require('../models/index');

// Add a new transaction
exports.createTransaction = async (req, res) => {
    const { total_amount, payment_method, type, branch_id, user_id, payment_details, products } = req.body;

    try {
        // Validate branch_id and user_id
        const branch = await Branch.findByPk(branch_id);
        if (!branch) {
            return res.status(404).json({
                status: 'error',
                message: 'Branch not found',
            });
        }

        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Create a new transaction
        const transaction = await Transaction.create({
            total_amount,
            payment_method,
            type,
            branch_id,
            user_id,
            status: 'pending',
        });

        // Add PaymentDetail if necessary
        if (payment_method === 'payment_gateway' || payment_method === 'EDC') {
            if (!payment_details || !payment_details.method) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Payment method is required in payment details',
                });
            }

            await PaymentDetail.create({
                transaction_id: transaction.id,
                method: payment_details.method,
                ...payment_details,  // Include additional payment details
            });
        }

        // Add products to the transaction
        if (products && products.length > 0) {
            const productRecords = await Product.findAll({
                where: {
                    id: products, // products should be an array of product IDs
                },
            });

            await transaction.addProducts(productRecords);
        }

        res.status(201).json({
            status: 'success',
            message: 'Transaction created successfully',
            data: transaction,
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create transaction',
            error: error.message,
        });
    }
};

// Get all transactions
exports.getTransactions = async (req, res) => {
    const user = req.user;

    try {
        let transactions;
        if (user.role === 'admin') {
            transactions = await Transaction.findAll({
                include: [
                    {
                        model: Product,
                        through: { attributes: [] }
                    }
                ]
            });
        } else if (user.role === 'branch_owner' || user.role === 'staff') {
            transactions = await Transaction.findAll({
                where: { branch_id: user.branch_id },
                include: [
                    {
                        model: Product,
                        through: { attributes: [] }
                    }
                ]
            });
        } else if (user.role === 'customer') {
            transactions = await Transaction.findAll({
                where: { user_id: user.userId },
                include: [
                    {
                        model: Product,
                        through: { attributes: [] }
                    }
                ]
            });
        } else {
            return res.status(403).json({
                status: 'error',
                message: 'Forbidden: Insufficient permissions',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Transactions retrieved successfully',
            data: transactions,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to get transactions',
            error: error.message,
        });
    }
};

// Get transaction by ID
exports.getTransactionById = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findByPk(transactionId, {
            include: [
                {
                    model: Product,
                    through: { attributes: [] }
                }
            ]
        });

        if (!transaction) {
            return res.status(404).json({
                status: 'error',
                message: 'Transaction not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Transaction retrieved successfully',
            data: transaction,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to get transaction',
            error: error.message,
        });
    }
};

// Update a transaction
exports.updateTransaction = async (req, res) => {
    const { transactionId } = req.params;
    const { total_amount, payment_method, type, branch_id, user_id, payment_details, products } = req.body;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({
                status: 'error',
                message: 'Transaction not found',
            });
        }

        // Update transaction
        transaction.total_amount = total_amount;
        transaction.payment_method = payment_method;
        transaction.type = type;
        transaction.branch_id = branch_id;
        transaction.user_id = user_id;

        await transaction.save();

        // Update PaymentDetail if necessary
        if (payment_method === 'payment_gateway' || payment_method === 'EDC') {
            if (!payment_details || !payment_details.method) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Payment method is required in payment details',
                });
            }

            await PaymentDetail.upsert({
                transaction_id: transaction.id,
                method: payment_details.method,
                ...payment_details,
            });
        }

        // Update products in the transaction
        if (products && products.length > 0) {
            const productRecords = await Product.findAll({
                where: {
                    id: products,
                },
            });

            await transaction.setProducts(productRecords); // This will replace the existing products with the new ones
        }

        res.status(200).json({
            status: 'success',
            message: 'Transaction updated successfully',
            data: transaction,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update transaction',
            error: error.message,
        });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await Transaction.findByPk(transactionId);
        if (!transaction) {
            return res.status(404).json({
                status: 'error',
                message: 'Transaction not found',
            });
        }

        await transaction.destroy();

        res.status(200).json({
            status: 'success',
            message: 'Transaction deleted successfully',
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to delete transaction',
            error: error.message,
        });
    }
};
