// authMiddleware.js


const jwt = require('jsonwebtoken');

const verifyToken = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Access denied, no token provided' });

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token: ", decoded); // Men-debug token yang didekode
            req.user = decoded;

            // Memeriksa apakah role pengguna sesuai
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }

            next();
        } catch (err) {
            res.status(400).json({ message: 'Invalid token' });
        }
    };
};

module.exports = verifyToken;


