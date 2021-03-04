/* eslint-disable no-underscore-dangle */
const passport = require('passport');

const School = require('../models/school');
const Major = require('../models/major');
const Course = require('../models/course');

module.exports = (app) => {
  // CREATE MAJOR
  app.post(
    '/schools/:schoolSlug/majors/new',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: slugSplit.join(' ') });

      req.body.school = school._id;

      const major = new Major(req.body);

      major
        .save()
        .then((givenMajor) => res.json(givenMajor))
        .catch(() => res.sendStatus(424));
    },
  );

  // READ MAJOR
  app.get(
    '/schools/:schoolSlug/majors/:majorSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { majorSlug } = req.params;
      const majorSlugSplit = majorSlug.split('_');
      Major.findOne({
        school: school._id,
        type: majorSlugSplit[0],
        name: majorSlugSplit[1],
      })
        .then((major) => res.json(major))
        .catch(() => res.sendStatus(404));
    },
  );

  // UPDATE MAJOR
  app.patch(
    '/schools/:schoolSlug/majors/:majorSlug/edit_type',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { majorSlug } = req.params;
      const majorSlugSplit = majorSlug.split('_');
      Major.findOneAndUpdate(
        {
          school: school._id,
          type: majorSlugSplit[0],
          name: majorSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((major) => res.json(major))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/majors/:majorSlug/edit_name',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { majorSlug } = req.params;
      const majorSlugSplit = majorSlug.split('_');
      Major.findOneAndUpdate(
        {
          school: school._id,
          type: majorSlugSplit[0],
          name: majorSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((major) => res.json(major))
        .catch(() => res.sendStatus(400));
    },
  );

  app.put(
    '/schools/:schoolSlug/majors/:majorSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { majorSlug } = req.params;
      const majorSlugSplit = majorSlug.split('_');
      Major.findOneAndUpdate(
        {
          school: school._id,
          type: majorSlugSplit[0],
          name: majorSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((major) => res.json(major))
        .catch(() => res.sendStatus(400));
    },
  );

  // CHANGE MAJOR-COURSE ASSOCIATIONS
  app.patch(
    '/schools/:schoolSlug/majors/:majorSlug/add_course_requirement/:courseSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { majorSlug } = req.params;
      const { courseSlug } = req.params;
      const slugOneSplit = majorSlug.split('_');
      const slugTwoSplit = courseSlug.split('_');

      Major.findOne({
        school: school._id,
        type: slugOneSplit[0],
        name: slugOneSplit[1],
      })
        .then(async (major) => {
          const course = await Course.findOne({
            school: school._id,
            department: slugTwoSplit[0],
            code: slugTwoSplit[1],
          });
          major.courses_required.unshift(course._id);
          major.save();
          return major;
        })
        .then((major) => res.json(major))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/majors/:majorSlug/delete_course_requirement/:courseSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { majorSlug } = req.params;
      const { courseSlug } = req.params;
      const slugOneSplit = majorSlug.split('_');
      const slugTwoSplit = courseSlug.split('_');

      Major.findOne({
        school: school._id,
        type: slugOneSplit[0],
        name: slugOneSplit[1],
      })
        .then(async (major) => {
          const course = await Course.findOne({
            school: school._id,
            department: slugTwoSplit[0],
            code: slugTwoSplit[1],
          });
          major.courses_required.remove(course._id);
          major.save();
          return major;
        })
        .then((major) => res.json(major))
        .catch(() => res.sendStatus(400));
    },
  );

  // DELETE MAJOR
  app.delete(
    '/schools/:schoolSlug/majors/:majorSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { majorSlug } = req.params;
      const slugSplit = majorSlug.split('_');
      Major.findOneAndDelete(
        { school: school._id, type: slugSplit[0], name: slugSplit[1] },
        (err) => {
          if (err) {
            return res.sendStatus(404);
          }
          return res.sendStatus(200);
        },
      );
    },
  );
};
