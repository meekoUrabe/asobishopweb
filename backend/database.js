const Database = require('better-sqlite3');
const path     = require('path');

const db = new Database(path.join(__dirname, 'asobi.db'));

function initDatabase() {


    // Users table
    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            username   TEXT    NOT NULL UNIQUE,
            password   TEXT    NOT NULL,
            status     TEXT    DEFAULT 'pending',
            created_at TEXT    DEFAULT (datetime('now'))
        )
    `);

    // Products table
    db.exec(`
        CREATE TABLE IF NOT EXISTS products (
            id          INTEGER PRIMARY KEY AUTOINCREMENT,
            name        TEXT    NOT NULL,
            category    TEXT    NOT NULL,
            description TEXT    NOT NULL,
            image_url   TEXT    DEFAULT NULL,
            stock       INTEGER DEFAULT 0,
            visible     INTEGER DEFAULT 1,
            created_at  TEXT    DEFAULT (datetime('now'))
        )
    `);

    // Champions table
    db.exec(`
        CREATE TABLE IF NOT EXISTS champions (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            game       TEXT NOT NULL,
            week       TEXT NOT NULL,
            month      TEXT NOT NULL,
            name       TEXT NOT NULL,
            deck       TEXT NOT NULL,
            updated_at TEXT DEFAULT (datetime('now'))
        )
    `);

        // Seed default champions if table is empty
    const championCount = db.prepare('SELECT COUNT(*) as count FROM champions').get();
    if (championCount.count === 0) {
        db.prepare(`
            INSERT INTO champions (game, week, month, name, deck)
            VALUES (?, ?, ?, ?, ?)
        `).run('pokemon', 'Stay Tuned', '—', 'Stay Tuned', 'Stay Tuned');

        db.prepare(`
            INSERT INTO champions (game, week, month, name, deck)
            VALUES (?, ?, ?, ?, ?)
        `).run('onepiece', 'Stay Tuned', '—', 'Stay Tuned', 'Stay Tuned');
    }

    // Seed default products if table is empty
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();
    if (productCount.count === 0) {
        const insert = db.prepare(`
            INSERT INTO products (name, category, description, image_url, stock)
            VALUES (?, ?, ?, ?, ?)
        `);

        insert.run('Scarlet & Violet Packs', 'pokemon',
            'Latest SV expansion booster packs.', null, 0);

        insert.run('Elite Trainer Box', 'pokemon',
            'Packs, sleeves, dice, damage counters.', null, 0);

        insert.run('Booster Packs', 'onepiece',
            'Latest OP sets.', null, 0);

        insert.run('Card Sleeves', 'accessories',
            'Premium matte and glossy sleeves.', null, 0);
    }

    console.log('✅ Database ready');
}

module.exports = { db, initDatabase };