const sequelize = require('../sequelize.init.js');
const config = require('../config.js');
const { User } = sequelize.models;
const jwt = require('jsonwebtoken');

exports.tryAuthenticate = async (username, password) => {
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
