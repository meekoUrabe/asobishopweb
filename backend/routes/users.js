const express     = require('express');
const router      = express.Router();
const bcrypt      = require('bcryptjs');
const { db }      = require('../database');
const { verifyToken, verifyHeadAdmin } = require('../middleware/auth');

// POST /api/signup — public, creates a pending account
router.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if username already exists
    const existing = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
    if (existing) {
        return res.status(409).json({ error: 'Username already taken' });
    }

    // Hash the password before storing
    const hashed = bcrypt.hashSync(password, 10);

    db.prepare(`
        INSERT INTO users (username, password, status)
        VALUES (?, ?, 'pending')
    `).run(username, hashed);

    res.status(201).json({ message: 'Account request submitted. Waiting for admin approval.' });
});

// GET /api/users — head admin only, get all users
router.get('/users', verifyHeadAdmin, (req, res) => {
    const users = db.prepare(
        'SELECT id, username, status, created_at FROM users ORDER BY created_at DESC'
    ).all();
    res.json(users);
});

// PUT /api/users/:id/approve — head admin only
router.put('/users/:id/approve', verifyHeadAdmin, (req, res) => {
    const { id } = req.params;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    db.prepare('UPDATE users SET status = ? WHERE id = ?').run('approved', id);
    res.json({ message: `${user.username} has been approved` });
});

// PUT /api/users/:id/reject — head admin only
router.put('/users/:id/reject', verifyHeadAdmin, (req, res) => {
    const { id } = req.params;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json({ message: `${user.username} has been rejected and removed` });
});

// PUT /api/users/:id/revoke — head admin only
router.put('/users/:id/revoke', verifyHeadAdmin, (req, res) => {
    const { id } = req.params;

    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    db.prepare('UPDATE users SET status = ? WHERE id = ?').run('pending', id);
    res.json({ message: `${user.username} access has been revoked` });
});

module.exports = router;