
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const baseURL = 'https://www.bullsgazette.com';

const scrapeArticles = async () => {
    try {
        const { data } = await axios.get(baseURL);
        const $ = cheerio.load(data);

        const articles = [];

        $('.post-card').each((i, element) => {
            const title = $(element).find('.post-title').text().trim();
            const content = $(element).find('.post-excerpt').text().trim();
            const image_url = $(element).find('img').attr('src');
            const url = $(element).find('a').attr('href');

            if (title && content && url) {
                articles.push({ title, content, image_url, url });
            }
        });

        fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
        console.log('Articles scraped and saved to articles.json');
    } catch (error) {
        console.error('Error scraping articles:', error);
    }
};

scrapeArticles();
