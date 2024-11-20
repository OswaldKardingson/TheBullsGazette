
const express = require('express');
const router = express.Router();
const pool = require('../db');
const { authenticateToken } = require('../middleware/auth');

// Get all articles
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM articles ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

// Get a single article
router.get('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(404).send('Article not found');
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
