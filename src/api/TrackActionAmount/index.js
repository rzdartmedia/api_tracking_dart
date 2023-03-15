const prefix = require('../../utils/prefix');
const TrackActionAmountHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'trackActionAmount',
    register: async (server, {
        service,
    }) => {
        const trackActionAmountHandler = new TrackActionAmountHandler({
            service,
        });

        server.route(prefix(process.env.PREFIX, routes(trackActionAmountHandler)));
    },
}