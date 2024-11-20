
const checkSubscription = (accessLevel) => {
    return (req, res, next) => {
        const { subscription_type } = req.user;
        if (accessLevel === 'premium' && subscription_type !== 'premium') {
            return res.status(403).send('Premium content. Upgrade your subscription.');
        }
        next();
    };
};

module.exports = checkSubscription;
