const express     = require('express');
const router      = express.Router();
const { db }      = require('../database');
const { verifyToken } = require('../middleware/auth');
const cloudinary  = require('cloudinary').v2;
const multer      = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// ─── Cloudinary Config ────────────────────────────────────────────
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key:    process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// ─── Multer + Cloudinary Storage ──────────────────────────────────
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:         'asobi-products',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{ width: 800, height: 800, crop: 'limit' }]
    }
});

const upload = multer({ storage });

// ─── GET /api/products — public ───────────────────────────────────
router.get('/products', (req, res) => {
    const { category } = req.query;

    let products;
    if (category) {
        products = db.prepare(
            'SELECT * FROM products WHERE visible = 1 AND category = ? ORDER BY id'
        ).all(category);
    } else {
        products = db.prepare(
            'SELECT * FROM products WHERE visible = 1 ORDER BY category, id'
        ).all();
    }

    res.json(products);
});

// ─── GET /api/products/all — admin only ───────────────────────────
router.get('/products/all', verifyToken, (req, res) => {
    const products = db.prepare('SELECT * FROM products ORDER BY category, id').all();
    res.json(products);
});

// ─── POST /api/products — admin only, with image upload ───────────
router.post('/products', verifyToken, upload.single('image'), (req, res) => {
    const { name, category, description, stock } = req.body;

    if (!name || !category || !description) {
        return res.status(400).json({ error: 'name, category, and description are required' });
    }

    const image_url = req.file ? req.file.path : null;

    const result = db.prepare(`
        INSERT INTO products (name, category, description, image_url, stock)
        VALUES (?, ?, ?, ?, ?)
    `).run(name, category, description, image_url, stock || 0);

    res.status(201).json({ id: result.lastInsertRowid, message: 'Product added' });
});

// ─── PUT /api/products/:id — admin only, with optional image ──────
router.put('/products/:id', verifyToken, upload.single('image'), (req, res) => {
    const { name, category, description, stock, visible } = req.body;
    const { id } = req.params;

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const image_url = req.file ? req.file.path : product.image_url;

    db.prepare(`
        UPDATE products
        SET name = ?, category = ?, description = ?, image_url = ?, stock = ?, visible = ?
        WHERE id = ?
    `).run(
        name        ?? product.name,
        category    ?? product.category,
        description ?? product.description,
        image_url,
        stock       ?? product.stock,
        visible     ?? product.visible,
        id
    );

    res.json({ message: 'Product updated' });
});

// ─── DELETE /api/products/:id — admin only ────────────────────────
router.delete('/products/:id', verifyToken, (req, res) => {
    const { id } = req.params;

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    db.prepare('DELETE FROM products WHERE id = ?').run(id);
    res.json({ message: 'Product deleted' });
});

module.exports = router;