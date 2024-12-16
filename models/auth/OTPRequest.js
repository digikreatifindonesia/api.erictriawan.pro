const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const { Op } = require('sequelize');

// Define OTPRequest model
const OTPRequest = sequelize.define('OTPRequest', {
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    otp_code: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'OTPRequests',  // Explicitly set table name
});

// Make sure the models are synchronized with the database
sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
});

module.exports = OTPRequest;
