
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [articles, setArticles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/articles')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch articles');
                }
                return response.json();
            })
            .then((data) => setArticles(data))
            .catch((err) => {
                console.error('Error fetching articles:', err);
                setError('Unable to load articles. Please try again later.');
            });
    }, []);

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-6">The Bull's Gazette</h1>
            <div className="grid md:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <div key={article.id} className="border rounded shadow-lg p-4 hover:shadow-xl">
                        <img
                            src={article.image_url}
                            alt={article.title}
                            className="w-full h-48 object-cover mb-4 rounded"
                        />
                        <h2 className="text-xl font-semibold">{article.title}</h2>
                        <p className="text-gray-600 truncate">{article.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
