const routes = require("./routes");
const AuthenticaionHandler = require("./handler");
const prefix = require("../../utils/prefix");

module.exports = {
    name: 'authentication',
    register: async (server, {
        service,
        userService,
        tokenManager,
        validator
    }) => {
        const authenticationHandler = new AuthenticaionHandler({
            service,
            userService,
            tokenManager,
            validator
        });

        server.route(prefix(process.env.PREFIX, routes(authenticationHandler)));
    },
};