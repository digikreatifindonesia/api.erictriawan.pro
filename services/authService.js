// services/authService.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Generate access token
const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' } // Access token expires in 1 hour
    );
};

// Generate refresh token
const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET,
        { expiresIn: '7d' } // Refresh token expires in 7 days
    );
};

// Verify refresh token
const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
};
