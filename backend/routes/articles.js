// Location: backend/routes/articles.js
const express = require('express');
const router = express.Router();
const { getAllArticles, getArticleById } = require('../controllers/articleController');
const { addArticle } = require('../controllers/articleController');
const { deleteArticle } = require('../controllers/articleController');

// Route to get all articles
router.get('/', getAllArticles);

// Route to get a specific article by ID
router.get('/:id', getArticleById);

// Route for Admin to Add Article
router.post('/', addArticle);

// Route for Admin to Delete Articles
router.delete('/:id', deleteArticle);

module.exports = router;

