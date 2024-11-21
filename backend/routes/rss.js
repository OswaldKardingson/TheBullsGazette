// rss.js
const express = require('express');
const router = express.Router();
const RSS = require('rss');

// Example articles
const articles = [
    { title: 'Article 1', description: 'This is the first article', url: '/article/1', date: new Date() },
    { title: 'Article 2', description: 'This is the second article', url: '/article/2', date: new Date() },
];

// Route to generate RSS feed
router.get('/', (req, res) => {
    try {
        const feed = new RSS({
            title: 'The Bulls Gazette',
            description: 'Latest updates and news from The Bulls Gazette',
            feed_url: 'https://bullsgazette.com/rss',
            site_url: 'https://bullsgazette.com',
            language: 'en',
        });

        articles.forEach(article => {
            feed.item({
                title: article.title,
                description: article.description,
                url: `https://bullsgazette.com${article.url}`,
                date: article.date,
            });
        });

        res.header('Content-Type', 'application/xml');
        res.send(feed.xml());
    } catch (error) {
        res.status(500).json({ error: 'Error generating RSS feed' });
    }
});

module.exports = router;
