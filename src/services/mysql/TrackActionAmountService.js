const db = require("../../../models");
const { TrackActionAmount } = require("../../../models");
const InvariantError = require("../../exceptions/InvariantError");
const { mapTrackActionAmounts } = require("../../utils/mapResult");

class TrackActionAmountService {
    constructor() {
        this._pool = db.sequelize;
    }

    async addTrackActionAmount(request) {
        try {
            const { id_track_amount, action_amount } = await this.getActionAmount(request);

            if (action_amount === 0) {
                const data = await TrackActionAmount.create({
                    id_user: request.idUser,
                    name_user: request.nameUser,
                    email_user: request.emailUser,
                    name_action: request.nameAction,
                    action: request.action,
                    action_amount: 1,
                }, { returning: ['id_track_amount'] });

                return {
                    idTrackAmount: data.id_track_amount,
                    actionAmount: 1,
                };
            } else {
                await TrackActionAmount.increment('action_amount', {
                    by: 1,
                    where: {
                        id_track_amount,
                    }
                })

                return {
                    idTrackAmount: id_track_amount,
                    actionAmount: action_amount + 1
                };
            }
        } catch (error) {
            console.log(error)
            throw new InvariantError('Internal server error')
        }
    }

    async getActionAmount(request) {
        const [data] = await this._pool.query(`
            SELECT id_track_amount, action_amount FROM track_action_amounts
            WHERE id_user = :userId AND name_action = :nameAction
            AND action = :action
        `, {
            replacements: {
                userId: request.idUser,
                nameAction: request.nameAction,
                action: request.action,
            }
        });

        if (data.length < 1) return { id_track_amount: 0, action_amount: 0 };
        return {
            id_track_amount: data[0].id_track_amount,
            action_amount: data[0].action_amount
        };
    }

    async deleteActionAmount(idTrackAmount) {
        await TrackActionAmount.destroy({
            where: {
                id_track_amount: idTrackAmount
            }
        })
    }

    async getCountTrackActionAmounts({ key, value }) {
        const [data] = await this._pool.query(`
            SELECT count(*) AS count FROM track_action_amounts
            WHERE ${key} LIKE :value
        `, {
            replacements: {
                value: `%${value}%`
            }
        });

        if (data.length < 1) return 0;
        return data[0].count;
    }

    async getTrackActionAmounts(limit, offset, { key, value }) {
        const [data] = await this._pool.query(`
            SELECT * FROM track_action_amounts
            WHERE ${key} LIKE :value
            ORDER BY updatedAt DESC
            LIMIT :limit OFFSET :offset
        `, {
            replacements: {
                limit,
                offset,
                value: `%${value}%`
            }
        });

        const result = data.map(mapTrackActionAmounts);
        return result;
    }
}

module.exports = TrackActionAmountService;