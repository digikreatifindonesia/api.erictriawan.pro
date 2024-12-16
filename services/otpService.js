const otpStore = new Map(); // Simpan OTP sementara untuk testing

// Generate OTP
function generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // OTP 6 digit
}

// Store OTP
function storeOtp(phoneNumber, otpCode) {
    const expiresIn = Date.now() + 5 * 60 * 1000; // Masa berlaku 5 menit
    otpStore.set(phoneNumber, { otpCode, expiresIn });
}

// Validate OTP
function validateOtp(phoneNumber, otpCode) {
    const otpData = otpStore.get(phoneNumber);
    if (!otpData) return false;
    const { otpCode: storedOtp, expiresIn } = otpData;
    if (storedOtp === otpCode && Date.now() < expiresIn) {
        otpStore.delete(phoneNumber); // Hapus OTP jika valid
        return true;
    }
    return false;
}

// Simulate sending OTP to the user (dummy)
function sendOtpToUser(phoneNumber) {
    const otpCode = generateOtp();
    storeOtp(phoneNumber, otpCode);
    console.log(`Dummy OTP for ${phoneNumber}: ${otpCode}`);
    return otpCode; // Return OTP untuk testing
}

module.exports = {
    generateOtp,
    storeOtp,
    validateOtp,
    sendOtpToUser, // Pastikan fungsi ini diekspor
};
