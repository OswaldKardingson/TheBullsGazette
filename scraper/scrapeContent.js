
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
            try {
                const title = $(element).find('.post-title').text().trim();
                const content = $(element).find('.post-excerpt').text().trim();
                const image_url = $(element).find('img').attr('src');
                const url = $(element).find('a').attr('href');

                if (!title || !content || !image_url) {
                    throw new Error('Missing article details');
                }

                articles.push({ title, content, image_url });
            } catch (innerError) {
                console.error('Error parsing article:', innerError.message);
            }
        });

        fs.writeFileSync('articles.json', JSON.stringify(articles, null, 2));
        console.log('Articles scraped successfully.');
    } catch (error) {
        console.error('Error scraping articles:', error.message);
    }
};

scrapeArticles();

