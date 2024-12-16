const express = require('express');
const { sendOtp, verifyOtp,loginAdmin,refreshToken,
    logout } = require('../controllers/authController');
const router = express.Router();

router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);
router.post('/login-admin', loginAdmin);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);


module.exports = router;
