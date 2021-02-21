import sequelize from '../sequelize.init.js';
import config from '../config.js';
const { User } = sequelize.models;
import jwt from 'jsonwebtoken';

export const tryAuthenticate = async (username, password) => {
    const { ok, user } = await User.test(username, password);

    if (ok) {
        const token = jwt.sign(
            {
                id: user.id,
                name: user.name,
            },
            config.jwtSecret
        );
        return { ok, token };
    } else {
        return { ok, token: undefined };
    }
};
