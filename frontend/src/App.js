
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import SubscriptionPage from './pages/SubscriptionPage';
import ArticleList from './components/ArticleList';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/article/:id" element={<ArticlePage />} />
                <Route path="/subscribe" element={<SubscriptionPage />} />
                <Route path="/" element={<ArticleList />} />
            </Routes>
        </Router>
    );
}

export default App;
