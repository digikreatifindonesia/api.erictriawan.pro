const bcrypt = require('bcryptjs');
const User = require('../models/auth/User');

async function createAdmin() {
    try {
        const admin = await User.findOne({ where: { role: 'admin' } });
        if (admin) {
            console.log('Admin already exists');
            return;
        }

        const hashedPassword = await bcrypt.hash('admin1234', 10);
        await User.create({
            phone_number: '1234567890',
            username: 'admin',
            email: 'admin@example.com',
            full_name: 'Admin User',
            role: 'admin',
            is_verified: true,
            password: hashedPassword,
        });

        console.log('Admin user created successfully');
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

module.exports = createAdmin; // Pastikan diekspor sebagai fungsi
