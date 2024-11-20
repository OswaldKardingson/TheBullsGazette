
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/api/articles/${id}`)
            .then((response) => response.json())
            .then((data) => setArticle(data))
            .catch((error) => console.error('Error fetching article:', error));
    }, [id]);

    if (!article) return <div>Loading...</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold">{article.title}</h1>
            <img src={article.image_url} alt={article.title} className="w-full h-auto my-4" />
            <p>{article.content}</p>
        </div>
    );
};

export default ArticlePage;
