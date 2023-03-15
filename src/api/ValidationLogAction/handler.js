class ValidationLogAction {
    constructor({
        service,
        authService,
        validator,
    }) {
        this._service = service;
        this._authService = authService;
        this._validator = validator;

        this.getValidationLogsActionHandler = this.getValidationLogsActionHandler.bind(this);
        this.getValidationLogsActionCMSHandler = this.getValidationLogsActionCMSHandler.bind(this);
        this.addValidationLogActionHandler = this.addValidationLogActionHandler.bind(this);
        this.getValidationLogActionByIdHandler = this.getValidationLogActionByIdHandler.bind(this);
        this.updateValidationLogActionHandler = this.updateValidationLogActionHandler.bind(this);
        this.deleteValidationLogActionHandler = this.deleteValidationLogActionHandler.bind(this);
    }

    async getValidationLogsActionHandler() {
        const validations = await this._service.getValidationLogActions();

        return {
            status: 'success',
            data: {
                validations
            }
        }
    }

    async getValidationLogsActionCMSHandler(request) {
        const queryName = request.query.name_action;
        const numRows = await this._service.getCountValidationLogActions({ key: 'name_action', value: queryName });
        const limit = parseInt(request.query.limit) || 10;
        const page = parseInt(request.query.page) || 1;
        const totalPages = Math.ceil(numRows / limit);
        const offset = limit * (page - 1);
        const validationLogsAction = await this._service.getValidationLogActionsCMS(limit, offset, { key: 'name_action', value: queryName });

        return {
            status: "success",
            data: {
                validationLogsAction,
            },
            totalData: numRows,
            totalPages: totalPages,
        };
    }

    async addValidationLogActionHandler(request) {
        this._validator.validateAddValidationLogActionPayload(request.payload);
        // validation channel value
        const channels = request.payload.channel;
        channels.map((channel) => {
            this._validator.validateChannelPayload(channel);
        });

        await this._service.addValidationLogAction(request.payload);
        return {
            status: 'success',
            message: 'Success add validation action'
        }
    }

    async getValidationLogActionByIdHandler(request) {
        const validationLogAction = await this._service.getValidationLogActionById(request.params.id);

        return {
            status: 'success',
            data: {
                validationLogAction
            }
        }
    }

    async updateValidationLogActionHandler(request) {
        this._validator.validatePutValidationLogActionPayload(request.payload);

        // validation channel value
        const channels = request.payload.channel;
        channels.map((channel) => {
            this._validator.validateChannelPayload(channel);
        });

        await this._service.updateValidationLogActionById(request.payload);
        return {
            status: 'success',
            message: 'Success update data validation action'
        }
    }

    async deleteValidationLogActionHandler(request) {
        await this._service.deleteValidationlogActionById(request.params);

        return {
            status: 'success',
            message: 'Success delete data validation action'
        }
    }
}

module.exports = ValidationLogAction;