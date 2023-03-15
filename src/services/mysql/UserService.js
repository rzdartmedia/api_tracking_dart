const bcrypt = require("bcrypt");
const InvariantError = require("../../exceptions/InvariantError");
const AuthenticationError = require("../../exceptions/AuthenticationError");
const db = require("../../../models");
const NotFoundError = require("../../exceptions/NotFoundError");
const { User } = require("../../../models");

class UserService {
    constructor() {
        this._pool = db.sequelize;
    }

    async verifyUserCredential({
        email,
        password,
    }) {
        const [user] = await this._pool.query(`
            SELECT id_user, name, password AS hashed_password FROM users
            WHERE email = :email LIMIT 1 
        `, {
            replacements: {
                email
            }
        });

        if (user.length < 1) throw new InvariantError('Email you provided is incorrect');

        const {
            id_user,
            name,
            hashed_password
        } = user[0];

        const match = await bcrypt.compare(password, hashed_password);

        if (!match) throw new AuthenticationError("Password you provided is incorrect");

        const data = {
            userId: id_user,
            name,
            email
        };

        return data;
    }

    async getDataUserById(userId) {
        const [data] = await this._pool.query(`
            SELECT * FROM users WHERE id_user = :userId`,
            {
                replacements: {
                    userId
                }
            });

        if (data.length < 1) throw new NotFoundError('User is not found');
        return data[0];
    }

    async updateTokenFcmUserById({ userId, fcmToken }) {
        await User.update({
            fcm_token: fcmToken
        }, { where: { id_user: userId } });
    }
}

module.exports = UserService;