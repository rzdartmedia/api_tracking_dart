const routes = (handler) => [
    {
        method: 'POST',
        path: '/authentication',
        handler: handler.addAuthenticationHandler
    },
    {
        method: 'DELETE',
        path: '/authentication',
        handler: handler.deleteAuthenticationHandler
    },
];

module.exports = routes;