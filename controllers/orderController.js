const Order = require('../models/transaction/order');

const createOrder = async (req, res) => {
    const { userId, items, orderType, deliveryAddress } = req.body;

    if (!userId || !items || !orderType) {
        return res.status(400).json({ message: 'Incomplete order details' });
    }

    if ((orderType === 'delivery' || orderType === 'takeaway') && !deliveryAddress) {
        return res.status(400).json({ message: 'Delivery address is required for delivery/takeaway' });
    }

    try {
        const order = await Order.create({
            userId,
            items,
            orderType,
            deliveryAddress: orderType === 'dine-in' ? null : deliveryAddress,
            status: 'pending'
        });
        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ message: 'Failed to place order' });
    }
};

module.exports = { createOrder };
