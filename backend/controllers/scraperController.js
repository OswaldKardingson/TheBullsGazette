const scrapeArticles = require('../../scraper/scrapecontent'); // Import scraper logic

const triggerScraper = async () => {
    await scrapeArticles(); // Call the scraper script
};

module.exports = { scrapeArticles: triggerScraper };
