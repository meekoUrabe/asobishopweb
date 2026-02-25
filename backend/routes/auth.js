const express = require('express');
const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const { db }  = require('../database');
const router  = express.Router();

// POST /api/login
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if head admin first
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign(
            { username, role: 'head_admin' },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );
        return res.json({ token, role: 'head_admin' });
    }

    // Check approved users in database
    const user = db.prepare('SELECT * FROM users WHERE username = ?').get(username);

    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.status === 'pending') {
        return res.status(403).json({ error: 'Your account is pending approval from the head admin.' });
    }

    if (user.status === 'rejected') {
        return res.status(403).json({ error: 'Your account request was rejected.' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
        { username: user.username, role: 'admin' },
        process.env.JWT_SECRET,
        { expiresIn: '8h' }
    );

    res.json({ token, role: 'admin' });
});

module.exports = router;