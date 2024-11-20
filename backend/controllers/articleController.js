    // Location: backend/controllers/articleController.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// Get all articles
const getAllArticles = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM articles');
        res.status(200).json(result.rows);
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

//Route for Admin to Add Articles
const addArticle = async (req, res) => {
    try {
        const { title, content, image_url } = req.body;

        if (!title || !content || !image_url) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        await pool.query(
            'INSERT INTO articles (title, content, image_url) VALUES ($1, $2, $3)',
            [title, content, image_url]
        );

        res.status(201).json({ message: 'Article added successfully.' });
    } catch (error) {
        console.error('Error adding article:', error);
        res.status(500).json({ message: 'Server error while adding article.' });
    }
};

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
