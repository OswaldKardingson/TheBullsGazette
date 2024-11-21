const axios = require('axios');
const cheerio = require('cheerio');
const { Client } = require('pg');
require('dotenv').config();

const baseURL = 'https://www.bullsgazette.com';

const client = new Client({
    connectionString: process.env.DATABASE_URL,
});

const scrapeArticles = async () => {
    try {
        console.log('Connecting to the database...');
        await client.connect();
        console.log('Connected to the database.');

        console.log(`Fetching data from ${baseURL}...`);
        const { data } = await axios.get(baseURL);
        const $ = cheerio.load(data);

        const articleLinks = [];
        console.log('Extracting article links...');
        $('a[rel="bookmark"]').each((i, element) => {
            const url = $(element).attr('href');
            if (url) {
                articleLinks.push(url.startsWith('http') ? url : `${baseURL}${url}`);
            }
        });

        console.log(`Found ${articleLinks.length} article links.`);
        const articles = [];

        // Visit each article link to scrape details
        for (const link of articleLinks) {
            try {
                console.log(`Fetching article: ${link}`);
                const { data: articlePage } = await axios.get(link);
                const $article = cheerio.load(articlePage);

                const title = $article('h1.tdb-title-text').text().trim();
                const content = $article('div.tdb-block-inner.td-fix-index').html().trim(); // HTML content
                const image_url = $article('img.entry-thumb').attr('src');
                const published_at = $article('time.entry-date').attr('datetime');
                const author = $article('a.tdb-author-name').text().trim();
                const categories = $article('a.tdb-entry-category').text().trim();

                console.log('Scraped data:', {
                    title,
                    content,
                    image_url,
                    published_at,
                    author,
                    categories,
                });

                if (title && content && image_url) {
                    articles.push({
                        title,
                        content,
                        image_url,
                        published_at,
                        author,
                        categories,
                        article_url: link,
                    });
                    console.log(`Scraped article: "${title}"`);
                } else {
                    console.warn(`Skipped article at ${link} due to missing details.`);
                }
            } catch (err) {
                console.error(`Error scraping article at ${link}:`, err.message);
            }
        }

        console.log(`Scraping completed. Found ${articles.length} articles.`);
        console.log('Starting bulk insertion into the database...');

        const query = `
            INSERT INTO articles (title, content, image_url, published_at, author, categories, article_url)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            ON CONFLICT (title) DO NOTHING;
        `;
        for (const article of articles) {
            const values = [
                article.title,
                article.content,
                article.image_url,
                article.published_at || new Date(),
                article.author,
                article.categories,
                article.article_url,
            ];
            try {
                await client.query(query, values);
                console.log(`Inserted article: "${article.title}" into the database.`);
            } catch (dbError) {
                console.error(`Database error for article: "${article.title}"`, dbError.message);
            }
        }
        console.log('All articles inserted successfully.');
    } catch (error) {
        console.error('Error during scraping:', error.message);
    } finally {
        console.log('Closing database connection...');
        await client.end();
        console.log('Database connection closed.');
    }
};

scrapeArticles();
