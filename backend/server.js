require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const { initDatabase } = require('./database');
const authRoutes       = require('./routes/auth');
const productRoutes    = require('./routes/products');
const championRoutes   = require('./routes/champions');
const userRoutes       = require('./routes/users');

const app  = express();
const PORT = process.env.PORT || 3000;

// ─── Middleware ───────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve frontend files as static assets
app.use(express.static(path.join(__dirname, '../frontend')));

// ─── API Routes ───────────────────────────────────────────────────
app.use('/api', authRoutes);
app.use('/api', productRoutes);
app.use('/api', championRoutes);
app.use('/api', userRoutes);

// ─── Fallback: serve index.html for any unmatched route ──────────
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ─── Start ────────────────────────────────────────────────────────
initDatabase();
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});