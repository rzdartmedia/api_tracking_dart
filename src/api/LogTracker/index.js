const routes = require("./routes");
const prefix = require("../../utils/prefix");
const LogTrackerHandler = require('./handler');

module.exports = {
    name: 'logTracker',
    register: async (server, {
        service,
        authService,
        validationLogActionService,
        userService,
        validator,
        trackAmountService,
    }) => {
        const logTrackerHandler = new LogTrackerHandler({
            service,
            authService,
            validationLogActionService,
            userService,
            validator,
            trackAmountService,
        });

        server.route(prefix(process.env.PREFIX, routes(logTrackerHandler)));
    },
};