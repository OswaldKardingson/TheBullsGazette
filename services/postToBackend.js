const axios = require('axios');

// Backend API endpoint
const backendURL = 'http://localhost:5000/api/articles';

// Function to post an article to the backend
const postToBackend = async (processedArticle) => {
    try {
        const response = await axios.post(backendURL, processedArticle, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Article successfully posted to backend:', response.data);
    } catch (error) {
        console.error('Error posting to backend:', error.message);
    }
};

module.exports = postToBackend;

// Example usage
// postToBackend({
//     title: 'Processed Title',
//     content: 'Processed Content',
//     image_url: 'https://example.com/generated-image.jpg',
//     category: 'Tech',
// });
