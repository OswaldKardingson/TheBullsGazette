
import React, { useState } from 'react';

const SubscriptionPage = () => {
    const [error, setError] = useState(null); // State to store errors
    const [loading, setLoading] = useState(false); // State to handle loading feedback

    const handleSubscription = async () => {
        setLoading(true); // Show loading feedback
        setError(null); // Reset error state
        try {
            const response = await fetch('http://localhost:5000/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan: 'premium' }), // Example subscription data
            });

            if (!response.ok) {
                throw new Error('Subscription failed. Please try again.');
            }

            const data = await response.json();
            alert(`Subscription successful! Plan: ${data.plan}`);
        } catch (err) {
            console.error('Error processing subscription:', err);
            setError('There was an issue processing your subscription. Please try again later.');
        } finally {
            setLoading(false); // Remove loading feedback
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Subscribe to The Bull's Gazette</h1>
            <p className="mb-4">Gain access to premium content and support independent journalism.</p>
            {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Display error */}
            <button
                onClick={handleSubscription}
                disabled={loading} // Disable button during loading
                className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 ${
                    loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
                {loading ? 'Processing...' : 'Subscribe Now'} {/* Show loading text */}
            </button>
        </div>
    );
};

export default SubscriptionPage;

