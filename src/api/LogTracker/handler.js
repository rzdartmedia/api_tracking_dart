const { SendNotificationFcm } = require("../../services/FCM/SendNotification");
const SendSMSApi = require("../../services/SMS/SendSMSApi");

class LogTrackerHandler {
    constructor({
        service,
        authService,
        validationLogActionService,
        userService,
        validator,
        trackAmountService,
    }) {
        this._service = service;
        this._authService = authService;
        this._validationLogActionService = validationLogActionService;
        this._userService = userService;
        this._validator = validator;
        this._trackAmountService = trackAmountService;

        this.addLogTrackerHandler = this.addLogTrackerHandler.bind(this);
        this.getLogTrackersHandler = this.getLogTrackersHandler.bind(this);
    }

    async addLogTrackerHandler(request) {
        const { token } = request.auth.artifacts;
        await this._authService.checkAccessToken(token)

        this._validator.validateAddLogTrackerPayload(request.payload);

        const { id: userId } = request.auth.credentials;
        const { name, email, fcm_token, no_handphone } = await this._userService.getDataUserById(userId);
        const { many_times, channels } = await this._validationLogActionService.getValidationManyAction(request.payload);
        request.payload.idUser = userId;
        request.payload.nameUser = name;
        request.payload.emailUser = email;

        await this._service.addLogTracker(request.payload);
        const { idTrackAmount, actionAmount } = await this._trackAmountService.addTrackActionAmount(request.payload);

        // Send to Channel
        if (actionAmount == many_times || many_times == 1) {
            // await this._trackAmountService.deleteActionAmount(idTrackAmount);
            channels.map(async (channel) => {
                switch (channel.channel) {
                    case 'app':
                        await SendNotificationFcm({ title: channel.title, message: channel.message, fcmToken: fcm_token });
                        console.log(channel.message)
                        break;

                    case 'sms':
                        await SendSMSApi({ number: no_handphone, message: channel.message });
                        break;

                    case 'email':
                        console.log('Email')
                        console.log(channel.message + email)
                        break;
                }
            })
        };

        return {
            status: 'success',
            message: 'Success add log tracker'
        }
    }

    async getLogTrackersHandler(request) {
        const queryName = request.query.name_user;
        const numRows = await this._service.getCountLogTracker({ key: 'name_user', value: queryName });
        const limit = parseInt(request.query.limit) || 10;
        const page = parseInt(request.query.page) || 1;
        const totalPages = Math.ceil(numRows / limit);
        const offset = limit * (page - 1);
        const logTrackers = await this._service.getLogTrackers(limit, offset, { key: 'name_user', value: queryName });

        return {
            status: "success",
            data: {
                logTrackers,
            },
            totalData: numRows,
            totalPages: totalPages,
        };
    }
}

module.exports = LogTrackerHandler;
