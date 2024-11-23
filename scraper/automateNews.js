const scrapeCoindesk = require('./scrapeCoindesk');
const processWithChatGPT = require('./chatGPT');
const postToBackend = require('./postToBackend');

// Main automation function
const automateNews = async () => {
    try {
        const articles = await scrapeCoindesk();

        for (const article of articles) {
            // Fetch full article content
            const { data } = await axios.get(article.link);
            const $ = cheerio.load(data);
            article.content = $('div.article-content').text().trim(); // Update with actual content selector

            // Process with ChatGPT
            const processed = await processWithChatGPT(article);

            if (processed) {
                // Post to backend
                const newArticle = {
                    title: processed.title,
                    content: processed.content,
                    image_url: processed.image,
                    category: article.category,
                };
                await postToBackend(newArticle);
            }
        }
    } catch (error) {
        console.error('Error automating news:', error.message);
    }
};

// Run the script periodically
setInterval(automateNews, 60 * 1000); // Runs every 60 seconds
