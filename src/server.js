require("dotenv").config(); // use data in file .env

const Hapi = require("@hapi/hapi"); // hapi framework for Back End
const Jwt = require("@hapi/jwt");

// Authentication
const authentication = require('./api/authentication')
const AuthenticationService = require('./services/mysql/AuthenticationService')
const AuthenticationValidator = require('./validator/authentication');

// User
const UserService = require('./services/mysql/UserService')

// Token Manager
const TokenManager = require('./tokenize/TokenManager');
const ClientError = require("./exceptions/ClientError");

// Validation Log Action
const validationLogAction = require('./api/ValidationLogAction');
const ValidationLogActionService = require('./services/mysql/ValidationLogActionService');
const ValidationLogActionValidator = require('./validator/validationLogAction');

// Log Tracker
const logTracker = require('./api/LogTracker');
const LogTrackerService = require('./services/mysql/LogTrackerService');
const LogTrackerValidator = require('./validator/logTracker');

// Track Action Amount Service
const trackActionAmount = require('./api/TrackActionAmount');
const TrackActionAmountService = require('./services/mysql/TrackActionAmountService');

const init = async () => {
    const authenticationService = new AuthenticationService();
    const userService = new UserService();
    const validationLogActionService = new ValidationLogActionService();
    const logTrackerService = new LogTrackerService();
    const trackActionAmountService = new TrackActionAmountService();

    const server = Hapi.server({
        port: process.env.PORT, //use data in .env
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ["*"], //cors origin for allow from IP browser akess API
            },
        },
    });

    await server.register([{
        plugin: Jwt, // Register plugin token JWT for authentication
    },]);

    // mendifiniskan strategy autentekasi jwt
    server.auth.strategy("lotrack_jwt", "jwt", {
        keys: process.env.ACCESS_TOKEN_KEY, // key for accessToken
        verify: {
            aud: false,
            iss: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE, //check age token
        },
        validate: (artifacts) => ({ // if true sent token jwt 
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id, //return payload id in token jwt use signify user
                nik: artifacts.decoded.payload.nik, //return payload nik in token jwt use signify user
            },
        }),
    });

    //  Penganganan Error Server Pada Handler
    server.ext("onPreResponse", (request, h) => {
        // mendapatkan konteks response dari request
        const {
            response
        } = request;

        if (response instanceof ClientError) {
            // membuat response baru dari response toolkit sesuai kebutuhan error handling
            const newResponse = h.response({
                status: "fail",
                message: response.message,
            });
            newResponse.code(response.statusCode);
            return newResponse;
        }

        // jika bukan ClientError, lanjutkan dengan response sebelumnya (tanpa terintervensi)
        return response.continue || response;
    });

    await server.register([
        {
            plugin: authentication,
            options: {
                service: authenticationService,
                userService: userService,
                tokenManager: TokenManager,
                validator: AuthenticationValidator,
            }
        },
        {
            plugin: validationLogAction,
            options: {
                service: validationLogActionService,
                authService: authenticationService,
                validator: ValidationLogActionValidator,
            }
        },
        {
            plugin: logTracker,
            options: {
                service: logTrackerService,
                authService: authenticationService,
                validationLogActionService,
                userService,
                validator: LogTrackerValidator,
                trackAmountService: trackActionAmountService,
            }
        },
        {
            plugin: trackActionAmount,
            options: {
                service: trackActionAmountService,
            }
        },
    ])

    // Running hapijs
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
