const routes = require("./routes");
const prefix = require("../../utils/prefix");
const ValidationLogAction = require('./handler');

module.exports = {
    name: 'validationLogAction',
    register: async (server, {
        service,
        authService,
        validator
    }) => {
        const validationLogAction = new ValidationLogAction({
            service,
            authService,
            validator
        });

        server.route(prefix(process.env.PREFIX, routes(validationLogAction)));
    },
};