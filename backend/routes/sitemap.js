// sitemap.js
const express = require('express');
const router = express.Router();
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Example data for your articles
const articles = [
    { url: '/article/1', changefreq: 'daily', priority: 0.8 },
    { url: '/article/2', changefreq: 'weekly', priority: 0.7 },
];

// Route to generate sitemap
router.get('/', async (req, res) => {
    try {
        const stream = new SitemapStream({ hostname: 'https://bullsgazette.com' });
        const data = Readable.from(articles);

        data.pipe(stream);
        const sitemap = await streamToPromise(stream);

        res.header('Content-Type', 'application/xml');
        res.send(sitemap.toString());
    } catch (error) {
        res.status(500).json({ error: 'Error generating sitemap' });
    }
});

module.exports = router;
