const jwt = require('jsonwebtoken');

const OTPRequest = require('../models/auth/OTPRequest');
const otpService = require('../services/otpService');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid'); // Generate unique username
const bcrypt = require('bcryptjs');
const RefreshToken = require('../models/auth/RefreshToken');
const crypto = require('crypto');
const { generateAccessToken, generateRefreshToken, verifyRefreshToken } = require('../services/authService');
const { User, LoyaltyPoints } = require("../models/index");
const DEFAULT_POINTS = 0; // Default points untuk pengguna
const INITIAL_POINTS = 5; // Poin awal untuk pengguna baru


const generateReferralCode = () => {
    const randomBytes = crypto.randomBytes(3); // 3 byte menghasilkan 6 karakter heksadesimal
    return randomBytes.toString('hex').toUpperCase(); // Mengubah ke huruf besar
};

const generateUniqueReferralCode = async () => {
    let referralCode;
    let isDuplicate;

    do {
        referralCode = generateReferralCode(); // Generate kode baru
        // Periksa apakah sudah ada di database
        isDuplicate = await User.findOne({ where: { referralCode } });
    } while (isDuplicate); // Ulangi jika duplikat

    return referralCode; // Kode unik berhasil dibuat
};

exports.sendOtp = async (req, res) => {
    const { phone_number } = req.body;

    try {
        const otpCode = otpService.generateOtp();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes

        await OTPRequest.create({ phone_number, otp_code: otpCode, expires_at: expiresAt });
        await otpService.sendOtpToUser(phone_number, otpCode); // Send OTP via SMS/WA

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to send OTP', error: error.message });
    }
};

exports.verifyOtp = async (req, res) => {
    const { phone_number, otp_code } = req.body;

    try {
        const otpRequest = await OTPRequest.findOne({
            where: {
                phone_number,
                otp_code,
                expires_at: { [Op.gt]: new Date() },
            },
        });

        if (!otpRequest) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        let user = await User.findOne({
            where: { phone_number },
            include: [LoyaltyPoints],
        });

        if (!user) {
            const username = `user_${crypto.randomBytes(2).toString('hex')}`;
            user = await User.create({
                phone_number,
                username,
                role: 'customer',
                is_verified: true,
                referralCode: await generateUniqueReferralCode(),
            });

            await LoyaltyPoints.create({
                userId: user.id,
                points: INITIAL_POINTS,
            });
        } else {
            user.is_verified = true;
            await user.save();
        }

        const token = jwt.sign(
            { userId: user.id, phone_number: user.phone_number, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'OTP verified successfully',
            token,
            user: {
                id: user.id,
                phone_number: user.phone_number,
                username: user.username,
                role: user.role,
                is_verified: user.is_verified,
            },
            points: user.LoyaltyPoints ? user.LoyaltyPoints.points : DEFAULT_POINTS,
        });
    } catch (error) {
        console.error('Failed to verify OTP:', error);
        res.status(500).json({ message: 'Failed to verify OTP', error: error.message });
    }
};




// Login logic for customer and admin
exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username, role: 'admin' } });

        if (!user) {
            return res.status(400).json({ message: 'Admin not found' });
        }

        // // Verifikasi password yang di-hash
        // const isMatch = await bcrypt.compare(password, user.password); // Membandingkan password input dengan yang ada di database
        // if (!isMatch) {
        //     return res.status(400).json({ message: 'Invalid password' });
        // }

        // Jika password valid, buat JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET,  // Pastikan secret tersedia di .env
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Refresh Token
// Refresh Token API
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // Verifikasi refresh token
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);

        // Cari refresh token di database
        const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!tokenRecord) {
            return res.status(404).json({ message: 'Invalid refresh token' });
        }

        // Temukan user yang terkait dengan refresh token
        const user = await User.findByPk(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Buat JWT token baru dengan user yang sama
        const newAccessToken = jwt.sign(
            { userId: user.id, username: user.username, role: user.role },
            process.env.JWT_SECRET, // JWT secret untuk access token
            { expiresIn: '1h' } // Set expiration time
        );

        return res.status(200).json({
            message: 'Access token refreshed successfully',
            accessToken: newAccessToken
        });
    } catch (error) {
        console.error('Error refreshing token:', error);
        return res.status(500).json({ message: 'Failed to refresh token', error: error.message });
    }
};


// Logout
exports.logout = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token is required' });
    }

    try {
        // Cari token di database
        const tokenRecord = await RefreshToken.findOne({ where: { token: refreshToken } });

        if (!tokenRecord) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Hapus token jika ditemukan
        await tokenRecord.destroy();
        return res.status(200).json({ message: 'Logged out successfully' });

    } catch (err) {
        console.error('Error during logout:', err.message);
        return res.status(500).json({ message: 'Failed to log out', error: err.message });
    }
};