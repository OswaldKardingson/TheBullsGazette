import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/articles/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch the article.');
                }
                return response.json();
            })
            .then((data) => setArticle(data))
            .catch((err) => {
                console.error('Error fetching article:', err);
                setError('Unable to load the article. Please try again later.');
            });
    }, [id]);

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!article) {
        return <div className="text-center">Loading article...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <img src={article.image_url} alt={article.title} className="w-full h-auto my-4" />
            <p>{article.content}</p>
        </div>
    );
};

export default ArticlePage;
