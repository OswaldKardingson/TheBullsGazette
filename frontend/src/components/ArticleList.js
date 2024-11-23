import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleList = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch articles from the backend
    const fetchArticles = async (page = 1) => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(`http://localhost:5000/api/articles?page=${page}&limit=10`);
            setArticles(response.data.articles);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            console.error('Error fetching articles:', err.message);
            setError('Failed to load articles. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchArticles(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            fetchArticles(page);
        }
    };

    return (
        <div className="articles">
            <h1>Latest Articles</h1>

            {loading && <p>Loading articles...</p>}
            {error && <p className="error">{error}</p>}

            <div className="articles-grid">
                {!loading &&
                    !error &&
                    articles.map((article) => (
                        <div key={article.id} className="article-card">
                            <img src={article.image_url} alt={article.title} />
                            <h2>{article.title}</h2>
                            <p>{article.content.substring(0, 200)}...</p>
                            <a href={`/articles/${article.id}`} className="read-more">
                                Read More
                            </a>
                        </div>
                    ))}
            </div>

            {/* Pagination Controls */}
            {!loading && !error && (
                <div className="pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ArticleList;
