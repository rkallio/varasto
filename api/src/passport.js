const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const config = require('./config.js');
const { findByKey } = require('./services/user.service.js');

const jwt = require('jsonwebtoken');

passport.use(
  new BearerStrategy((token, done) => {
    const payload = jwt.verify(token, config.jwtSecret);
    findByKey(payload.id)
      .then((user) => done(null, user))
      .catch((err) => done(err));
  })
);

module.exports = passport;
