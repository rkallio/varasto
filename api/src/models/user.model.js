import Sequelize from 'sequelize';
import sequelize from '../sequelize.init.js';
import bcrypt from 'bcrypt';
import config from '../config.js';

class User extends Sequelize.Model {
    static test(name, password, options) {
        return bcrypt.compare(password, this.password);
    }
}

User.init(
    {
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 20],
            },
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4, 72],
            },
            set(password) {
                this.setDataValue(
                    'password',
                    bcrypt.hashSync(password, config.saltRounds)
                );
            },
        },
    },
    {
        sequelize,
        underscored: true,
        modelName: 'User',
    }
);
