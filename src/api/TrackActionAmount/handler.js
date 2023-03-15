class TrackActionAmount {
    constructor({
        service
    }) {
        this._service = service;

        this.getTrackActionAmountsHandler = this.getTrackActionAmountsHandler.bind(this);
    }

    async getTrackActionAmountsHandler(request) {
        const queryName = request.query.name_user;
        const numRows = await this._service.getCountTrackActionAmounts({ key: 'name_user', value: queryName });
        const limit = parseInt(request.query.limit) || 10;
        const page = parseInt(request.query.page) || 1;
        const totalPages = Math.ceil(numRows / limit);
        const offset = limit * (page - 1);
        const trackActionAmounts = await this._service.getTrackActionAmounts(limit, offset, { key: 'name_user', value: queryName });

        return {
            status: 'success',
            data: {
                trackActionAmounts,
            },
            totalData: numRows,
            totalPages
        }
    }
}

module.exports = TrackActionAmount;
