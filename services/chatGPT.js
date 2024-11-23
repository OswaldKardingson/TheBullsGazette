const axios = require('axios');

// ChatGPT API placeholder
const OPENAI_API_KEY = 'YOUR_OPENAI_API_KEY'; // Replace with actual API key

// Function to interact with ChatGPT
const processWithChatGPT = async (article) => {
    try {
        const prompt = `
            Rephrase the title:
            "${article.title}"

            Rephrase the following content without altering the main subject. Expand the content to include more context and SEO-optimized keywords:
            "${article.content}"

            Provide an image generation prompt related to the following image URL:
            "${article.image}"
        `;

        const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 3000,
            },
            {
                headers: {
                    Authorization: `Bearer ${OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const chatGPTOutput = response.data.choices[0].text.trim();
        return chatGPTOutput;
    } catch (error) {
        console.error('Error interacting with ChatGPT:', error.message);
        return null;
    }
};

module.exports = processWithChatGPT;

// Example usage
// processWithChatGPT({ title: 'Test Title', content: 'Test Content', image: 'https://example.com/image.jpg' })
//     .then((result) => console.log(result));
