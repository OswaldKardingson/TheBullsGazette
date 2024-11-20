
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/articles')
            .then((response) => response.json())
            .then((data) => setArticles(data))
            .catch((error) => console.error('Error fetching articles:', error));
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-6">The Bull's Gazette</h1>
            <div className="grid md:grid-cols-3 gap-4">
                {articles.map((article) => (
                    <Link to={`/article/${article.id}`} key={article.id} className="block">
                        <div className="border rounded shadow-lg p-4 hover:shadow-xl">
                            <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover mb-4 rounded" />
                            <h2 className="text-xl font-semibold">{article.title}</h2>
                            <p className="text-gray-600 truncate">{article.content.slice(0, 100)}...</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
