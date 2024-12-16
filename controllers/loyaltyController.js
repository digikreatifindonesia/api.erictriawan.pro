const LoyaltyPoints = require('../models/loyalty/LoyaltyPoints');
const LoyaltyPointsHistory = require('../models/loyalty/LoyaltyPointsHistory');

// Mendapatkan saldo poin pengguna
async function getUserPoints(req, res) {
    const userId = req.user.userId; // Use userId instead of id
    try {
        const loyalty = await LoyaltyPoints.findOne({ where: { userId } });
        const points = loyalty ? loyalty.pointsBalance : 0;
        res.status(200).json({ points });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching points balance', error: err.message });
    }
}


// Tambahkan poin saat transaksi selesai
async function earnPoints(req, res) {
    const { userId, orderId, totalSpent } = req.body;
    const pointsEarned = Math.floor(totalSpent / 10000); // Contoh: 1 poin per Rp 10.000

    try {
        // Tambahkan poin ke tabel LoyaltyPoints
        const [loyalty] = await LoyaltyPoints.findOrCreate({ where: { userId } });
        loyalty.pointsBalance += pointsEarned;
        await loyalty.save();

        // Catat riwayat
        await LoyaltyPointsHistory.create({
            userId,
            orderId,
            pointsEarned,
            description: 'Points earned from order',
        });

        res.status(200).json({ message: 'Points added', pointsEarned });
    } catch (err) {
        res.status(500).json({ message: 'Error earning points', error: err.message });
    }
}

// Tukarkan poin
async function redeemUserPoints(req, res) {
    const { userId, pointsToRedeem } = req.body;

    try {
        const loyalty = await LoyaltyPoints.findOne({ where: { userId } });

        if (!loyalty || loyalty.pointsBalance < pointsToRedeem) {
            return res.status(400).json({ message: 'Not enough points to redeem' });
        }

        // Kurangi saldo poin
        loyalty.pointsBalance -= pointsToRedeem;
        await loyalty.save();

        // Catat riwayat
        await LoyaltyPointsHistory.create({
            userId,
            pointsRedeemed: pointsToRedeem,
            description: 'Points redeemed',
        });

        res.status(200).json({ message: 'Points redeemed', pointsToRedeem });
    } catch (err) {
        res.status(500).json({ message: 'Error redeeming points', error: err.message });
    }
}

module.exports = { getUserPoints, earnPoints, redeemUserPoints };
