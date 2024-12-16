// controllers/branchController.js

const {Franchise,User,Branch} = require('../models/index');


exports.createBranch = async (req, res) => {
    const {
        name, address, location, phone_number, branch_head,
        owner_id, franchise_owner_id, franchise_start_date, is_franchise, franchise_id
    } = req.body;

    try {
        // Validasi apakah owner_id ada di tabel users
        if (owner_id) {
            const owner = await User.findByPk(owner_id);
            if (!owner) {
                return res.status(400).json({ message: 'Owner not found' });
            }
        }

        // Validasi apakah franchise_owner_id ada di tabel users
        if (franchise_owner_id) {
            const franchiseOwner = await User.findByPk(franchise_owner_id);
            if (!franchiseOwner) {
                return res.status(400).json({ message: 'Franchise Owner not found' });
            }
        }

        // Jika branch adalah franchise, pastikan franchise_id valid
        if (is_franchise) {
            const franchise = await Franchise.findByPk(franchise_id);
            if (!franchise) {
                return res.status(400).json({ message: 'Franchise not found' });
            }
        }

        // Membuat branch baru
        const branch = await Branch.create({
            name,
            address,
            location,
            phone_number,
            branch_head,
            owner_id,
            franchise_owner_id,
            franchise_start_date,
            is_franchise,
            franchise_id,
        });

        res.status(201).json({
            status: 'success',
            message: 'Branch created successfully',
            data: branch,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create branch',
            error: error.message,
        });
    }
};


exports.getBranches = async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.status(200).json({
            status: 'success',
            message: 'Branches retrieved successfully',
            data: branches,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve branches',
            error: error.message,
        });
    }
};


exports.getBranchById = async (req, res) => {
    const { id } = req.params; // Mengambil ID dari parameter URL

    try {
        // Mencari cabang berdasarkan ID
        const branch = await Branch.findByPk(id);

        // Jika cabang tidak ditemukan
        if (!branch) {
            return res.status(404).json({
                status: 'error',
                message: `Branch with ID ${id} not found`,
            });
        }

        // Jika cabang ditemukan
        res.status(200).json({
            status: 'success',
            message: 'Branch retrieved successfully',
            data: branch,
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve branch',
            error: error.message,
        });
    }
};