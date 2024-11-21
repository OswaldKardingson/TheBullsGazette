// subscriptions.js
const express = require('express');
const router = express.Router();

// Mock database of subscriptions
const subscriptions = [];

// Route to get all subscriptions
router.get('/', (req, res) => {
    res.json(subscriptions);
});

// Route to create a new subscription
router.post('/', (req, res) => {
    const { userId, plan } = req.body;

    if (!userId || !plan) {
        return res.status(400).json({ error: 'UserId and Plan are required' });
    }

    const newSubscription = { id: subscriptions.length + 1, userId, plan, date: new Date() };
    subscriptions.push(newSubscription);

    res.status(201).json(newSubscription);
});

// Route to cancel a subscription
router.delete('/:id', (req, res) => {
    const subscriptionId = parseInt(req.params.id, 10);
    const index = subscriptions.findIndex(sub => sub.id === subscriptionId);

    if (index === -1) {
        return res.status(404).json({ error: 'Subscription not found' });
    }

    subscriptions.splice(index, 1);
    res.status(200).json({ message: 'Subscription canceled' });
});

module.exports = router;
