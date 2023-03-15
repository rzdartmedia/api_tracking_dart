const routes = (handler) => [
    {
        method: 'GET',
        path: '/validation-log-action',
        handler: handler.getValidationLogsActionHandler
    },
    {
        method: 'GET',
        path: '/validation-log-action/cms',
        handler: handler.getValidationLogsActionCMSHandler
    },
    {
        method: 'POST',
        path: '/validation-log-action',
        handler: handler.addValidationLogActionHandler
    },
    {
        method: 'GET',
        path: '/validation-log-action/{id}',
        handler: handler.getValidationLogActionByIdHandler
    },
    {
        method: 'PUT',
        path: '/validation-log-action',
        handler: handler.updateValidationLogActionHandler
    },
    {
        method: 'DELETE',
        path: '/validation-log-action/{id}',
        handler: handler.deleteValidationLogActionHandler
    },
];

module.exports = routes;