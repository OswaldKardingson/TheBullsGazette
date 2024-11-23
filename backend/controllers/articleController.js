// Location: backend/controllers/articleController.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Get all articles with pagination
const getAllArticles = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query; // Default: page 1, 10 articles per page
        const offset = (page - 1) * limit;

        const result = await pool.query(
            'SELECT * FROM articles ORDER BY published_at DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        const totalCountResult = await pool.query('SELECT COUNT(*) FROM articles');
        const totalCount = parseInt(totalCountResult.rows[0].count, 10);

        res.status(200).json({
            articles: result.rows,
            currentPage: parseInt(page, 10),
            totalPages: Math.ceil(totalCount / limit),
            totalArticles: totalCount,
        });
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Server error while fetching articles.' });
    }
};

// Get an article by ID
const getArticleById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM articles WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Article not found.' });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching article by ID:', error);
        res.status(500).json({ message: 'Server error while fetching article.' });
    }
};

// Add an article (used by scraper or admin)
const addArticle = async (req, res) => {
    try {
        const { title, content, image_url, category } = req.body;

        // Validate input
        if (!title || !content || !image_url || !category) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const result = await pool.query(
            `INSERT INTO articles (title, content, image_url, category, published_at)
             VALUES ($1, $2, $3, $4, NOW())
             RETURNING *`,
            [title, content, image_url, category]
        );

        res.status(201).json({ message: 'Article added successfully.', article: result.rows[0] });
    } catch (error) {
        console.error('Error adding article:', error);
        res.status(500).json({ message: 'Server error while adding article.' });
    }
};

// Delete an article by ID
const deleteArticle = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('DELETE FROM articles WHERE id = $1', [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Article not found.' });
        }

        res.status(200).json({ message: 'Article deleted successfully.' });
    } catch (error) {
        console.error('Error deleting article:', error);
        res.status(500).json({ message: 'Server error while deleting article.' });
    }
};

module.exports = { getAllArticles, getArticleById, addArticle, deleteArticle };
