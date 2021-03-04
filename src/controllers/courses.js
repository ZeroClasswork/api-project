/* eslint-disable no-underscore-dangle */
const passport = require('passport');

const School = require('../models/school');
const Course = require('../models/course');

module.exports = (app) => {
  // CREATE COURSE
  app.post(
    '/schools/:schoolSlug/courses/new',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const slugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: slugSplit.join(' ') });

      req.body.school = school._id;

      const course = new Course(req.body);

      course
        .save()
        .then((givenCourse) => res.json(givenCourse))
        .catch(() => res.sendStatus(424));
    },
  );

  // READ COURSE
  app.get(
    '/schools/:schoolSlug/courses/:courseSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOne({
        school: school._id,
        department: courseSlugSplit[0],
        code: courseSlugSplit[1],
      })
        .then((course) => res.json(course))
        .catch(() => res.sendStatus(404));
    },
  );

  // UPDATE COURSE
  app.patch(
    '/schools/:schoolSlug/courses/:courseSlug/edit_department',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOneAndUpdate(
        {
          school: school._id,
          department: courseSlugSplit[0],
          code: courseSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((course) => res.json(course))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/courses/:courseSlug/edit_code',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOneAndUpdate(
        {
          school: school._id,
          department: courseSlugSplit[0],
          code: courseSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((course) => res.json(course))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/courses/:courseSlug/edit_name',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOneAndUpdate(
        {
          school: school._id,
          department: courseSlugSplit[0],
          code: courseSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((course) => res.json(course))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/courses/:courseSlug/edit_description',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOneAndUpdate(
        {
          school: school._id,
          department: courseSlugSplit[0],
          code: courseSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((course) => res.json(course))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/courses/:courseSlug/edit_units',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOneAndUpdate(
        {
          school: school._id,
          department: courseSlugSplit[0],
          code: courseSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((course) => res.json(course))
        .catch(() => res.sendStatus(400));
    },
  );

  app.put(
    '/schools/:schoolSlug/courses/:courseSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOneAndUpdate(
        {
          school: school._id,
          department: courseSlugSplit[0],
          code: courseSlugSplit[1],
        },
        req.body,
        { new: true },
      )
        .then((course) => res.json(course))
        .catch(() => res.sendStatus(400));
    },
  );

  // CHANGE COURSE-COURSE ASSOCIATIONS
  app.patch(
    '/schools/:schoolSlug/courses/:courseOneSlug/add_prerequisite/:courseTwoSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseOneSlug } = req.params;
      const { courseTwoSlug } = req.params;
      const slugOneSplit = courseOneSlug.split('_');
      const slugTwoSplit = courseTwoSlug.split('_');

      Course.findOne({
        school: school._id,
        department: slugOneSplit[0],
        code: slugOneSplit[1],
      })
        .then(async (courseOne) => {
          const courseTwo = await Course.findOne({
            school: school._id,
            department: slugTwoSplit[0],
            code: slugTwoSplit[1],
          });
          courseOne.prerequisites.unshift(courseTwo._id);
          courseTwo.postrequisites.unshift(courseOne._id);
          courseOne.save();
          courseTwo.save();
          return courseOne;
        })
        .then((courseOne) => res.json(courseOne))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/courses/:courseOneSlug/delete_prerequisite/:courseTwoSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseOneSlug } = req.params;
      const { courseTwoSlug } = req.params;
      const slugOneSplit = courseOneSlug.split('_');
      const slugTwoSplit = courseTwoSlug.split('_');

      Course.findOne({
        school: school._id,
        department: slugOneSplit[0],
        code: slugOneSplit[1],
      })
        .then(async (courseOne) => {
          const courseTwo = await Course.findOne({
            school: school._id,
            department: slugTwoSplit[0],
            code: slugTwoSplit[1],
          });
          courseOne.prerequisites.remove(courseTwo._id);
          courseTwo.postrequisites.remove(courseOne._id);
          courseOne.save();
          courseTwo.save();
          return courseOne;
        })
        .then((courseOne) => res.json(courseOne))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/courses/:courseOneSlug/add_corequisite/:courseTwoSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseOneSlug } = req.params;
      const { courseTwoSlug } = req.params;
      const slugOneSplit = courseOneSlug.split('_');
      const slugTwoSplit = courseTwoSlug.split('_');

      Course.findOne({
        school: school._id,
        department: slugOneSplit[0],
        code: slugOneSplit[1],
      })
        .then(async (courseOne) => {
          const courseTwo = await Course.findOne({
            school: school._id,
            department: slugTwoSplit[0],
            code: slugTwoSplit[1],
          });
          courseOne.corequisites.unshift(courseTwo._id);
          courseOne.save();
          return courseOne;
        })
        .then((courseOne) => res.json(courseOne))
        .catch(() => res.sendStatus(400));
    },
  );

  app.patch(
    '/schools/:schoolSlug/courses/:courseOneSlug/delete_corequisite/:courseTwoSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseOneSlug } = req.params;
      const { courseTwoSlug } = req.params;
      const slugOneSplit = courseOneSlug.split('_');
      const slugTwoSplit = courseTwoSlug.split('_');

      Course.findOne({
        school: school._id,
        department: slugOneSplit[0],
        code: slugOneSplit[1],
      })
        .then(async (courseOne) => {
          const courseTwo = await Course.findOne({
            school: school._id,
            department: slugTwoSplit[0],
            code: slugTwoSplit[1],
          });
          courseOne.corequisites.remove(courseTwo._id);
          courseOne.save();
          return courseOne;
        })
        .then((courseOne) => res.json(courseOne))
        .catch(() => res.sendStatus(400));
    },
  );

  // DELETE COURSE
  app.delete(
    '/schools/:schoolSlug/courses/:courseSlug',
    passport.authenticate('headerapikey', {
      session: false,
      failureRedirect: '/unauthorized',
    }),
    async (req, res) => {
      const { schoolSlug } = req.params;
      const schoolSlugSplit = schoolSlug.split('_');
      const school = await School.findOne({ name: schoolSlugSplit.join(' ') });

      const { courseSlug } = req.params;
      const courseSlugSplit = courseSlug.split('_');
      Course.findOneAndDelete(
        {
          school: school._id,
          department: courseSlugSplit[0],
          code: courseSlugSplit[1],
        },
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
