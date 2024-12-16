// middlewares/checkRole.js
const checkRole = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        console.log("User does not have the correct role:", req.user.role);
        return res.status(403).json({ message: 'Access forbidden: insufficient role' });
    }

    console.log("User has the required role:", req.user.role);
    next();
};

module.exports = checkRole;
