const routes = (handler) => [
    {
        method: 'GET',
        path: '/log-tracker-amount',
        handler: handler.getTrackActionAmountsHandler,
    },
];

module.exports = routes;