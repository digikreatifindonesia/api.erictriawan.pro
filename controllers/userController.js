const jwt = require('jsonwebtoken');
const User = require('../models/auth/user');


//get profile
exports.getProfile = async (req, res) => {
    try {
        const userId = req.user.userId; // Ambil userId dari token yang terverifikasi
        const user = await User.findByPk(userId); // Ambil data pengguna berdasarkan userId

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Kirimkan data profil pengguna
        res.status(200).json({
            status: 'success',
            message: 'Profile retrieved successfully',
            data: {
                id: user.id,
                phone_number: user.phone_number,
                username: user.username,
                role: user.role,
                is_verified: user.is_verified,
                full_name: user.full_name,      // Menambahkan full_name
                gender: user.gender,            // Menambahkan gender
                address: user.address,          // Menambahkan address
                birth_date: user.birth_date,    // Menambahkan birth_date
                profile_photo: user.profile_photo, // Menambahkan profile_photo
                email: user.email
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to get profile',
            error: error.message,
        });
    }
};


//update profile
exports.updateProfile = async (req, res) => {
    const { full_name, gender, address, birth_date, profile_photo, email } = req.body;

    try {
        // Ambil userId dari token yang sudah terverifikasi
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        // Cari pengguna berdasarkan userId
        let user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found',
            });
        }

        // Perbarui data profil pengguna
        user.full_name = full_name || user.full_name;
        user.gender = gender || user.gender;
        user.address = address || user.address;
        user.birth_date = birth_date || user.birth_date;
        user.profile_photo = profile_photo || user.profile_photo;
        user.email = email || user.email;

        // Simpan data yang sudah diperbarui
        await user.save();

        res.status(200).json({
            status: 'success',
            message: 'Profile updated successfully',
            data: {
                id: user.id,
                full_name: user.full_name,
                gender: user.gender,
                address: user.address,
                birth_date: user.birth_date,
                profile_photo: user.profile_photo,
                email: user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to update profile',
            error: error.message,
        });
    }
};