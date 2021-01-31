import sequelize from '../sequelize.init.js';
const { User } = sequelize.models;
import jwt from 'jsonwebtoken';

const tryAuthenticate = async (username, password) => {
    const ok = await User.test(username, password);

    if (ok) {
        const token = jwt.sign({ username }, config.jwtSecret);
        return { ok, token: 'here' };
    } else {
        return { ok, token: undefined };
    }
};

export default tryAuthenticate;
