const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token      = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied — no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
}

function verifyHeadAdmin(req, res, next) {
    verifyToken(req, res, function () {
        if (req.admin.role !== 'head_admin') {
            return res.status(403).json({ error: 'Access denied — head admin only' });
        }
        next();
    });
}

module.exports = { verifyToken, verifyHeadAdmin };