const db = require("../../../models");
const AuthenticationError = require("../../exceptions/AuthenticationError");
const { Authentication } = require('../../../models')

class AuthenticationService {
    constructor() {
        this._pool = db.sequelize;
    }

    async addAuthentication({
        token,
        userId,
    }) {
        const query = await this.checkAuthentication(userId);
        const date = new Date();

        if (query === 'update') {
            await Authentication.update({
                token,
                updatedAt: date,
            }, { where: { id_user: userId } });
        } else if (query === 'insert') {
            await Authentication.create({
                id_user: userId,
                token,
            })
        };
    }

    async checkAuthentication(userId) {
        const [token] = await this._pool.query(`
            SELECT id_user FROM authentications
            WHERE id_user = :userId
        `, {
            replacements: {
                userId
            }
        });

        if (token.length > 0) {
            return 'update';
        } else {
            return 'insert';
        }
    };

    async deleteAuthentication(token) {
        await this._pool.query(
            `DELETE FROM authentications WHERE token = :token`,
            {
                replacements: {
                    token
                }
            }
        );
    };

    async getUserIdFromAccessToken(token) {
        const data = await Authentication.findOne({ where: { token }, attributes: ['id_user'] });

        if (!data) throw new AuthenticationError('Token is not valid');

        return data.id_user;
    }

    async checkAccessToken(token) {
        const [data] = await this._pool.query(
            `SELECT token FROM authentications WHERE token = :token`,
            {
                replacements: {
                    token
                }
            }
        );

        if (data.length < 1) throw new AuthenticationError('Token is not valid');
    }
}

module.exports = AuthenticationService;