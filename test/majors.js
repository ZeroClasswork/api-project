/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
const chai = require('chai');
const chaiHttp = require('chai-http');

const School = require('../src/models/school');
const Major = require('../src/models/major');
const Course = require('../src/models/course');

chai.should();
chai.use(chaiHttp);

const app = require('../server');

describe('Majors', function () {
  const agent = chai.request.agent(app);

  // API Key Variable
  const apiKey = {
    Authorization: `Api-Key ${process.env.API_KEY}`,
  };

  // School for Tests
  const testSchool = {
    name: 'Test University',
    city: 'Test Francisco',
    state: 'North Testkota',
    country: 'United Tests of America',
  };

  // Major for Tests
  let testMajor = {
    type: 'BS',
    name: 'Test',
  };

  // Course for Tests
  const testCourse = {
    department: 'TST',
    code: '101',
    name: 'Introduction to Testing',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    units: '3',
  };

  before(function () {
    School.deleteMany(testSchool);
    Major.deleteMany(testMajor);
    Course.deleteMany(testCourse);

    agent
      .post('/schools/new')
      .set(apiKey)
      .send(testSchool)
      .then(function () {
        agent
          .post('/schools/Test_University/courses/new')
          .set(apiKey)
          .send(testCourse)
          .catch(function () {});
      })
      .catch(function () {});
  });

  it('should create new major with valid attributes at POST /schools/Test_University/majors/new', function (done) {
    Major.estimatedDocumentCount()
      .then(function (initialDocCount) {
        agent
          .post('/schools/Test_University/majors/new')
          .set(apiKey)
          .send(testMajor)
          .then(function (res) {
            res.status.should.equal(200);
            res.body.should.be.a('Object');
            Major.estimatedDocumentCount()
              .then(function (newDocCount) {
                newDocCount.should.be.equal(initialDocCount + 1);
                done();
              })
              .catch(function (err) {
                done(err);
              });
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('should receive major attributes at GET /schools/Test_University/majors/BS_Test', function (done) {
    agent
      .get('/schools/Test_University/majors/BS_Test')
      .set(apiKey)
      .then(function (res) {
        res.status.should.equal(200);
        res.body.should.have.property('type').and.to.equal(testMajor.type);
        res.body.should.have.property('name').and.to.equal(testMajor.name);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('should update major type at PATCH /schools/Test_University/majors/BS_Test/edit_type', function (done) {
    testMajor.type = 'BA';
    agent
      .patch('/schools/Test_University/majors/BS_Test/edit_type')
      .set(apiKey)
      .send({ type: testMajor.type })
      .then(function (outerRes) {
        outerRes.status.should.equal(200);
        outerRes.body.should.have.property('type').and.to.equal(testMajor.type);
        outerRes.body.should.have.property('name').and.to.equal(testMajor.name);
        agent
          .get('/schools/Test_University/majors/BA_Test')
          .set(apiKey)
          .then(function (innerRes) {
            innerRes.status.should.equal(200);
            innerRes.body.should.have
              .property('type')
              .and.to.equal(testMajor.type);
            innerRes.body.should.have
              .property('name')
              .and.to.equal(testMajor.name);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('should update major name at PATCH /schools/Test_University/majors/BS_Test/edit_name', function (done) {
    testMajor.name = 'test';
    agent
      .patch('/schools/Test_University/majors/BA_Test/edit_type')
      .set(apiKey)
      .send({ name: testMajor.name })
      .then(function (outerRes) {
        outerRes.status.should.equal(200);
        outerRes.body.should.have.property('type').and.to.equal(testMajor.type);
        outerRes.body.should.have.property('name').and.to.equal(testMajor.name);
        agent
          .get('/schools/Test_University/majors/BA_test')
          .set(apiKey)
          .then(function (innerRes) {
            innerRes.status.should.equal(200);
            innerRes.body.should.have
              .property('type')
              .and.to.equal(testMajor.type);
            innerRes.body.should.have
              .property('name')
              .and.to.equal(testMajor.name);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('should update major attributes at PUT /schools/Test_University/majors/BS_Test', function (done) {
    testMajor = {
      type: 'BS',
      name: 'Test',
    };
    agent
      .put('/schools/Test_University/majors/BA_test')
      .set(apiKey)
      .send(testMajor)
      .then(function (outerRes) {
        outerRes.status.should.equal(200);
        outerRes.body.should.have.property('type').and.to.equal(testMajor.type);
        outerRes.body.should.have.property('name').and.to.equal(testMajor.name);
        agent
          .get('/schools/Test_University/majors/BS_Test')
          .set(apiKey)
          .then(function (innerRes) {
            innerRes.status.should.equal(200);
            innerRes.body.should.have
              .property('type')
              .and.to.equal(testMajor.type);
            innerRes.body.should.have
              .property('name')
              .and.to.equal(testMajor.name);
            done();
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('should add course to major at PATCH /schools/Test_University/majors/BS_Test/add_course_requirement/TST_101', function (done) {
    agent
      .patch(
        '/schools/Test_University/majors/BS_Test/add_course_requirement/TST_101',
      )
      .set(apiKey)
      .then(function (res) {
        res.status.should.equal(200);
        res.body.should.have.property('type').and.to.equal(testMajor.type);
        res.body.should.have.property('name').and.to.equal(testMajor.name);
        res.body.should.have
          .property('courses_required')
          .and.to.be.a('Array')
          .and.to.have.lengthOf(1);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('should delete course from major at PATCH /schools/Test_University/majors/BS_Test/delete_course_requirement/TST_101', function (done) {
    agent
      .patch(
        '/schools/Test_University/majors/BS_Test/delete_course_requirement/TST_101',
      )
      .set(apiKey)
      .then(function (res) {
        res.status.should.equal(200);
        res.body.should.have.property('type').and.to.equal(testMajor.type);
        res.body.should.have.property('name').and.to.equal(testMajor.name);
        res.body.should.have
          .property('courses_required')
          .and.to.be.a('Array')
          .and.to.have.lengthOf(0);
        done();
      })
      .catch(function (err) {
        done(err);
      });
  });

  it('should delete major at DELETE /schools/Test_University/majors/BS_Test', function (done) {
    Major.estimatedDocumentCount()
      .then(function (initialDocCount) {
        agent
          .delete('/schools/Test_University/majors/BS_Test')
          .set(apiKey)
          .then(function (res) {
            res.should.have.status(200);
            Major.estimatedDocumentCount()
              .then(function (newDocCount) {
                newDocCount.should.be.equal(initialDocCount - 1);
                done();
              })
              .catch(function (err) {
                done(err);
              });
          })
          .catch(function (err) {
            done(err);
          });
      })
      .catch(function (err) {
        done(err);
      });
  });

  after(function () {
    School.deleteMany(testSchool);
    Major.deleteMany(testMajor);
    Course.deleteMany(testCourse);
  });
});
