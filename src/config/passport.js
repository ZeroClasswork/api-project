const passport = require('passport');
const crypto = require('crypto');
const { HeaderAPIKeyStrategy } = require('passport-headerapikey');

const APIUser = require('../models/api_user');

const hashKey = (key) => crypto.createHash(process.env.ALGORITHM).update(key).digest('hex');

passport.use(
  new HeaderAPIKeyStrategy(
    { header: 'Authorization', prefix: 'Api-Key ' },
    false,
    (key, done) => {
      APIUser.findOne({ apiKey: hashKey(key) })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          return done(null, user);
        })
        .catch((err) => done(err));
    },
  ),
);
