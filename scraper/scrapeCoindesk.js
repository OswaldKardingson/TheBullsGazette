const axios = require('axios');
const cheerio = require('cheerio');

// URL of the Coindesk homepage
const coindeskURL = 'https://www.coindesk.com';

let lastScrapedArticle = null; // Store the last article ID to avoid duplication

// Function to scrape Coindesk
const scrapeCoindesk = async () => {
    try {
        console.log('Checking for new articles...');
        const { data } = await axios.get(coindeskURL);
        const $ = cheerio.load(data);

        // Select all articles in the desired categories
        const articles = [];
        $('article').each((_, element) => {
            const category = $(element).find('.category-tag').text().trim();
            if (!['Markets', 'Finance', 'Policy', 'Tech'].includes(category)) {
                return; // Skip articles outside the desired categories
            }

            const title = $(element).find('h4').text().trim();
            const link = coindeskURL + $(element).find('a').attr('href');
            const image = $(element).find('img').attr('src');

            // Check if it's a new article
            if (title && title !== lastScrapedArticle) {
                articles.push({ title, link, image, category });
            }
        });

        if (articles.length > 0) {
            lastScrapedArticle = articles[0].title; // Update last article
            console.log(`Found ${articles.length} new article(s).`);
            return articles;
        } else {
            console.log('No new articles found.');
            return [];
        }
    } catch (error) {
        console.error('Error scraping Coindesk:', error.message);
    }
};

// Export the scraper for use in the full pipeline
module.exports = scrapeCoindesk;

// Example execution
scrapeCoindesk().then((articles) => console.log(articles));
