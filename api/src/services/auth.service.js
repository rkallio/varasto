import sequelize from '../sequelize.init.js';
import config from '../config.js';
const { User } = sequelize.models;
import jwt from 'jsonwebtoken';

const tryAuthenticate = async (username, password) => {
    const ok = await User.test(username, password);

    if (ok) {
        const token = jwt.sign({ username }, config.jwtSecret);
        return { ok, token };
    } else {
        return { ok, token: undefined };
    }
};

export default tryAuthenticate;
