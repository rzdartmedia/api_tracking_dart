const { nanoid } = require("nanoid");
const db = require("../../../models");
const { ValidationLogAction } = require("../../../models");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");
const { mapValidationLogActions, mapValidationLogActionsCMS } = require("../../utils/mapResult");
const { Op } = require('sequelize');

class ValidationLogActionService {
    constructor() {
        this._pool = db.sequelize;
    }

    async getValidationLogActions() {
        const [data] = await this._pool.query(`
            SELECT * FROM validation_logs_action
        `);

        const result = data.map(mapValidationLogActions);
        return result;
    }

    async getValidationManyAction({ action, nameAction }) {
        const [data] = await this._pool.query(`
            SELECT many_times, channel AS channels FROM validation_logs_action
            WHERE name_action = :nameAction AND action = :action
            ORDER BY updatedAt DESC
        `, {
            replacements: {
                action,
                nameAction
            }
        });

        if (data.length < 1) throw new NotFoundError('Validation action is not found');

        return data[0];
    }

    async getCountValidationLogActions({ key, value }) {
        const [data] = await this._pool.query(`
            SELECT count(*) AS count FROM validation_logs_action
            WHERE ${key} LIKE :value
        `, {
            replacements: {
                value: `%${value}%`
            }
        });

        if (data.length < 1) return 0;
        return data[0].count;
    }

    async getValidationLogActionsCMS(limit, offset, { key, value }) {
        const [data] = await this._pool.query(
            `SELECT * FROM validation_logs_action 
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

        const result = data.map(mapValidationLogActionsCMS);
        return result;
    }

    async addValidationLogAction(request) {
        await this.checkAddValidationLogAction(request);
        try {
            await ValidationLogAction.create({
                id_validation: `validation-${nanoid(10)}`,
                name_action: request.nameAction,
                action: request.action,
                many_times: request.manyTimes,
                channel: request.channel,
            });
        } catch (error) {
            console.log(error);
            throw new InvariantError('Internal server error')
        }
    }

    async checkAddValidationLogAction(request) {
        const data = await ValidationLogAction.findOne({
            where: {
                name_action: request.nameAction,
                action: request.action,
                many_times: request.manyTimes,
            },
            attributes: ['id_validation'],
        });

        if (data) throw new InvariantError('Name action, Action, and Many times, have ready');
    }

    async getValidationLogActionById(id) {
        const data = await ValidationLogAction.findAll({
            where: { id_validation: id }
        });

        if (data.length < 1) throw new NotFoundError('Validation log action is not found');
        const result = data.map(mapValidationLogActionsCMS);
        return result[0];
    }

    async updateValidationLogActionById(request) {
        const data = await this.getValidationLogActionById(request.idValidation);
        data.manyTimes = request.manyTimes;
        await this.checkDoubleValidationLogActionById(data);

        await ValidationLogAction.update({
            many_times: request.manyTimes,
            channel: request.channel
        }, {
            where: {
                id_validation: request.idValidation
            }
        });
    }

    async checkDoubleValidationLogActionById(request) {
        const data = await ValidationLogAction.findOne({
            attributes: ['id_validation'],
            where: {
                name_action: request.nameAction,
                action: request.action,
                many_times: request.manyTimes,
                id_validation: {
                    [Op.not]: request.idValidation
                }
            }
        });

        if (data) throw new InvariantError('Validation log action many times is available')
    }

    async deleteValidationlogActionById(request) {
        await this.getValidationLogActionById(request.id);

        await ValidationLogAction.destroy({ where: { id_validation: request.id } });
    }
}

module.exports = ValidationLogActionService;