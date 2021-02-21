import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';
import config from './config.js';
import { findByKey } from './services/user.service.js';

import jwt from 'jsonwebtoken';

passport.use(
    new BearerStrategy((token, done) => {
        const payload = jwt.verify(token, config.jwtSecret);
        findByKey(payload.id)
            .then((user) => done(null, user))
            .catch((err) => done(err));
    })
);

export default passport;
