/* eslint-disable no-param-reassign */
const crypto = require('crypto');

const APIUser = require('../models/api_user');

module.exports = (app) => {
  app.post('/users/new', (req, res) => {
    const user = new APIUser({ email: req.body.email });

    user
      .save()
      .then((givenUser) => {
        const key = crypto.randomBytes(8).toString('hex');
        const apiKey = crypto
          .createHash(process.env.ALGORITHM)
          .update(key)
          .digest('hex');
        givenUser.apiKey = apiKey;
        givenUser.save();
        return key;
      })
      .then((givenUser) => res.json({ 'Api-Key': givenUser }))
      .catch(() => res.sendStatus(424));
  });

  app.patch('/users/me/regenerate_key', (req, res) => {
    APIUser.findOne({ email: req.body.email })
      .then((user) => {
        const key = crypto.randomBytes(8).toString('hex');
        const apiKey = crypto
          .createHash(process.env.ALGORITHM)
          .update(key)
          .digest('hex');
        user.apiKey = apiKey;
        user.save();
        return key;
      })
      .then((key) => res.json({ 'Api-Key': key }))
      .catch(() => res.sendStatus(404));
  });

  app.get('/unauthorized', (req, res) => res.status(401).json({ Error: 'You must be authorized to do that' }));
};
