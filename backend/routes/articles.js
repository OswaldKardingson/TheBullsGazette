// Location: backend/routes/articles.js
const express = require('express');
const router = express.Router();
const { getAllArticles, getArticleById, addArticle, deleteArticle } = require('../controllers/articleController');
const { scrapeArticles } = require('../controllers/scraperController'); // New scraper function

// Route to get all articles
router.get('/', getAllArticles);

// Route to get a specific article by ID
router.get('/:id', getArticleById);

// Route for Admin to Add Article
router.post('/', addArticle);

// Route for Admin to Delete Articles
router.delete('/:id', deleteArticle);

// New Route: Trigger Scraper
router.post('/scrape', async (req, res) => {
    try {
        await scrapeArticles(); // Function to call the scraper logic
        res.status(200).json({ message: 'Scraper triggered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error triggering scraper' });
    }
});

module.exports = router;

