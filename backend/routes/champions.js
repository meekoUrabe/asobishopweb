const express     = require('express');
const router      = express.Router();
const { db }      = require('../database');
const { verifyToken } = require('../middleware/auth');

// GET /api/champions — public, used by index.html
router.get('/champions', (req, res) => {
    const champions = db.prepare('SELECT * FROM champions ORDER BY game').all();
    res.json(champions);
});

// PUT /api/champions/:game — admin only
// :game is either 'pokemon' or 'onepiece'
router.put('/champions/:game', verifyToken, (req, res) => {
    const { game }                    = req.params;
    const { week, month, name, deck } = req.body;

    if (!week || !month || !name || !deck) {
        return res.status(400).json({ error: 'week, month, name, and deck are all required' });
    }

    const champion = db.prepare('SELECT * FROM champions WHERE game = ?').get(game);

    if (champion) {
        db.prepare(`
            UPDATE champions
            SET week = ?, month = ?, name = ?, deck = ?, updated_at = datetime('now')
            WHERE game = ?
        `).run(week, month, name, deck, game);
    } else {
        db.prepare(`
            INSERT INTO champions (game, week, month, name, deck)
            VALUES (?, ?, ?, ?, ?)
        `).run(game, week, month, name, deck);
    }

    res.json({ message: `${game} champion updated` });
});

module.exports = router;