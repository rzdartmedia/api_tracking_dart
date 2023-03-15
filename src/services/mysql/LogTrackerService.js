const db = require("../../../models");
const { LogTracker } = require("../../../models");
const { mapLogTracker } = require("../../utils/mapResult");

class LogTrackerService {
    constructor() {
        this._pool = db.sequelize;
    }

    async addLogTracker(request) {
        await LogTracker.create({
            id_user: request.idUser,
            name_user: request.nameUser,
            email_user: request.emailUser,
            name_action: request.nameAction,
            action: request.action,
        });
    }

    async getCountLogTracker({ key, value }) {
        const [data] = await this._pool.query(`
            SELECT count(*) AS count FROM logs_tracker
            WHERE ${key} LIKE :value
        `, {
            replacements: {
                value: `%${value}%`
            }
        });

        if (data.length < 1) return 0;
        return data[0].count;
    }

    async getLogTrackers(limit, offset, { key, value }) {
        const [data] = await this._pool.query(
            `SELECT * FROM logs_tracker
            WHERE ${key} LIKE :value
            ORDER BY createdAt DESC 
            LIMIT :limit OFFSET :offset`,
            {
                replacements: {
                    limit,
                    offset,
                    value: `%${value}%`
                }
            }
        );

        const result = data.map(mapLogTracker);
        return result;
    }
}

module.exports = LogTrackerService;