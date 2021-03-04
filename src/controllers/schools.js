const passport = require('passport');

const School = require('../models/school');

module.exports = (app) => {
  // CREATE SCHOOL
  app.post(
    '/schools/new',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const school = new School(req.body);

      school
        .save()
        .then((givenSchool) => res.json(givenSchool))
        .catch(() => res.sendStatus(424));
    },
  );

  // READ SCHOOL
  app.get(
    '/schools/:schoolSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      School.findOne({ name: slugSplit.join(' ') })
        .then((school) => res.json(school))
        .catch(() => res.sendStatus(404));
    },
  );

  // UPDATE SCHOOL
  app.patch(
    '/schools/:schoolSlug/edit_name',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      School.findOneAndUpdate({ name: slugSplit.join(' ') }, req.body, {
        new: true,
      })
        .then((school) => res.json(school))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/edit_city',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      School.findOneAndUpdate({ name: slugSplit.join(' ') }, req.body, {
        new: true,
      })
        .then((school) => res.json(school))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/edit_state',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      School.findOneAndUpdate({ name: slugSplit.join(' ') }, req.body, {
        new: true,
      })
        .then((school) => res.json(school))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/edit_country',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      School.findOneAndUpdate({ name: slugSplit.join(' ') }, req.body, {
        new: true,
      })
        .then((school) => res.json(school))
        .catch(() => res.sendStatus(400));
    },
  );

  app.put(
    '/schools/:schoolSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      School.findOneAndUpdate({ name: slugSplit.join(' ') }, req.body, {
        new: true,
      })
        .then((school) => res.json(school))
        .catch(() => res.sendStatus(400));
    },
  );

  // DELETE SCHOOL
  app.delete(
    '/schools/:schoolSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      School.findOneAndDelete({ name: slugSplit.join(' ') }, (err) => {
        if (err) {
          return res.sendStatus(404);
        }
        return res.sendStatus(200);
      });
    },
  );
};
