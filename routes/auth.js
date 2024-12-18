const express = require('express');
const { sendOtp, verifyOtp, loginAdmin, refreshToken, logout } = require('../controllers/authController');
const router = express.Router();

/**
 * @swagger
 * /api/auth/send-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Send OTP to the user"
 *     description: "Sends an OTP (One Time Password) to the user via email or phone."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - phone_number
 *             properties:
 *               phone_number:
 *                 type: string
 *                 example: "62811277083"  # Gantilah dengan contoh nomor telepon
 *             type: object
 *     responses:
 *       200:
 *         description: "OTP sent successfully"
 *       400:
 *         description: "Invalid request"
 */
router.post('/send-otp', sendOtp);


/**
 * @swagger
 * /api/auth/verify-otp:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Verify OTP entered by the user"
 *     description: "Verifies the OTP entered by the user for login."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - phone_number
 *               - otp_code
 *             properties:
 *               phone_number:
 *                 type: string
 *                 example: "62812345670"
 *               otp_code:
 *                 type: string
 *                 example: "123456"
 *             type: object
 *     responses:
 *       200:
 *         description: "OTP verified successfully"
 *       400:
 *         description: "Invalid OTP"
 */
router.post('/verify-otp', verifyOtp);

/**
 * @swagger
 * /api/auth/login-admin:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Admin login"
 *     description: "Log in the admin user and get a token."
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "password123"
 *             type: object
 *     responses:
 *       200:
 *         description: "Login successful"
 *       400:
 *         description: "Invalid credentials"
 */
router.post('/login-admin', loginAdmin);


/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Refresh token"
 *     description: "Refresh the authentication token for the admin."
 *     responses:
 *       200:
 *         description: "Token refreshed successfully"
 *       401:
 *         description: "Unauthorized"
 */
router.post('/refresh-token', refreshToken);


/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Auth
 *     summary: "Logout the admin"
 *     description: "Logs out the admin user and invalidates the session."
 *     responses:
 *       200:
 *         description: "Logout successful"
 *       400:
 *         description: "Error during logout"
 */
router.post('/logout', logout);

module.exports = router;
