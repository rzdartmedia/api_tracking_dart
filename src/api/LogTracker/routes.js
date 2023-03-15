const routes = (handler) => [
    {
        method: 'POST',
        path: '/log-tracker',
        handler: handler.addLogTrackerHandler,
        options: {
            auth: 'lotrack_jwt'
        }
    },
    {
        method: 'GET',
        path: '/log-tracker',
        handler: handler.getLogTrackersHandler,
    },
];

module.exports = routes;