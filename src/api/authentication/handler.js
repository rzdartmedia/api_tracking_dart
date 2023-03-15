class AuthenticaionHandler {
    constructor({
        service,
        userService,
        tokenManager,
        validator
    }) {
        this._service = service;
        this._userService = userService;
        this._tokenManager = tokenManager;
        this._validator = validator;

        this.addAuthenticationHandler = this.addAuthenticationHandler.bind(this);
        this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
    }

    async addAuthenticationHandler(request) {
        this._validator.validateAddAuthenticationPayload(request.payload);

        const { fcmToken } = request.payload;

        const {
            userId,
            name,
            email
        } = await this._userService.verifyUserCredential(request.payload);

        const accessToken = this._tokenManager.generateAccessToken({
            id: userId,
            name,
            email
        });

        await this._service.addAuthentication({
            token: accessToken,
            userId,
        });

        // update token fcm user after login
        await this._userService.updateTokenFcmUserById({ userId, fcmToken })

        return {
            status: 'success',
            message: 'Authentication success',
            data: {
                accessToken
            }
        }
    }

    async deleteAuthenticationHandler(request) {
        this._validator.validateDeleteAuthenticationPayload(request.payload);

        const {
            accessToken
        } = request.payload;

        const userId = await this._service.getUserIdFromAccessToken(accessToken);
        await this._service.deleteAuthentication(accessToken);

        // Delete fcm token user
        await this._userService.updateTokenFcmUserById({ userId, fcmToken: "" });

        return {
            status: 'success',
            message: 'Authentication berhasil di hapus'
        }
    }
}

module.exports = AuthenticaionHandler;