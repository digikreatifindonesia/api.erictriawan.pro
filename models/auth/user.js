const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const bcrypt = require('bcryptjs'); // For password hashing
const { v4: uuidv4 } = require('uuid'); // For generating unique referral codes

const User = sequelize.define('User', {
    phone_number: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    full_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: DataTypes.ENUM('Male', 'Female', 'Other'),
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    birth_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
    },
    profile_photo: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin', 'branch_owner', 'staff'),
        allowNull: false,
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: true, // This is nullable for users who don't require passwords
    },
    referralCode: {
        type: DataTypes.STRING(36),
        allowNull: false,
        unique: true, // Referral code should be unique
    },
    referred_by: {
        type: DataTypes.STRING(36),
        allowNull: true, // Referral code of the user who referred this user
    }
}, {
    timestamps: true, // Optional: If you want createdAt and updatedAt
});

// Hook to hash the password before saving it to the database for admin users
User.beforeCreate(async (user, options) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }

    // Generate a unique referral code for the user
    if (!user.referralCode) {
        user.referralCode = uuidv4();
    }
});

User.beforeUpdate(async (user, options) => {
    if (user.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
    }
});

module.exports = User;
