const app = require("../server")
const chai = require("chai")
const chaiHttp = require("chai-http")

const Course = require("../src/models/course")
const Major = require("../src/models/major")

chai.should()
chai.use(chaiHttp)

describe("Majors", function() {
  const agent = chai.request.agent(app)

  // Major for Tests
  let testMajor = {
    type: "BS",
    name: "Test"
  }

  // Course for Tests
  let testCourse = {
    department: "TST",
    code: "101",
    name: "Introduction to Testing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    units: "3",
  }

  before(function() {
    const course = new Course(testCourse)
    course.save()

    Major.deleteMany(testMajor)
  })

  it("should create new major with valid attributes at POST /majors/new", function(done) {
    Major.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .post("/majors/new")
          .send(testMajor)
          .then(function (res) {
            res.status.should.equal(200)
            res.body.should.be.a("Object")
            Major.estimatedDocumentCount()
              .then(function(newDocCount) {
                newDocCount.should.be.equal(initialDocCount + 1)
                done()
              })
              .catch(function(err) {
                done(err)
              })
          })
          .catch(function(err) {
            done(err)
          })
      })
      .catch(function(err) {
        done(err)
      })
  })

  it("should receive major attributes at GET /majors/BS_Test", function(done) {
    agent
      .get("/majors/BS_Test")
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("type").and.to.equal(testMajor.type)
        res.body.should.have.property("name").and.to.equal(testMajor.name)
        done()
      })
      .catch(function(err) {
        done(err)
      })
  })

  it("should update major type at PATCH /majors/BS_Test/edit_type", function(done) {
    testMajor.type = "BA"
    agent
      .patch("/majors/BS_Test/edit_type")
      .send({type: testMajor.type})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("type").and.to.equal(testMajor.type)
        res.body.should.have.property("name").and.to.equal(testMajor.name)
        agent
          .get("/majors/BA_Test")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("type").and.to.equal(testMajor.type)
            res.body.should.have.property("name").and.to.equal(testMajor.name)
            done()
          })
          .catch(function(err) {
            done(err)
          })
      })
      .catch(function(err) {
        done(err)
      })
  })

  it("should update major name at PATCH /majors/BS_Test/edit_name", function(done) {
    testMajor.name = "test"
    agent
      .patch("/majors/BA_Test/edit_type")
      .send({name: testMajor.name})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("type").and.to.equal(testMajor.type)
        res.body.should.have.property("name").and.to.equal(testMajor.name)
        agent
          .get("/majors/BA_test")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("type").and.to.equal(testMajor.type)
            res.body.should.have.property("name").and.to.equal(testMajor.name)
            done()
          })
          .catch(function(err) {
            done(err)
          })
      })
      .catch(function(err) {
        done(err)
      })
  })

  it("should update major attributes at PUT /majors/BS_Test", function(done) {
    testMajor = {
      type: "BS",
      name: "Test"
    }
    agent
      .put("/majors/BA_test")
      .send(testMajor)
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("type").and.to.equal(testMajor.type)
        res.body.should.have.property("name").and.to.equal(testMajor.name)
        agent
          .get("/majors/BS_Test")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("type").and.to.equal(testMajor.type)
            res.body.should.have.property("name").and.to.equal(testMajor.name)
            done()
          })
          .catch(function(err) {
            done(err)
          })
      })
      .catch(function(err) {
        done(err)
      })
  })

  it("should add course to major at PATCH /majors/BS_Test/add_course_requirement/TST_101", function(done) {
    agent
      .patch("/majors/BS_Test/add_course_requirement/TST_101")
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("type").and.to.equal(testMajor.type)
        res.body.should.have.property("name").and.to.equal(testMajor.name)
        res.body.should.have.property("courses_required").and.to.be.a("Array").and.to.have.lengthOf(1)
        done()
    })
    .catch(function(err) {
      done(err)
    })
  })

  it("should delete course to major at PATCH /majors/BS_Test/delete_course_requirement/TST_101", function(done) {
    agent
      .patch("/majors/BS_Test/delete_course_requirement/TST_101")
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("type").and.to.equal(testMajor.type)
        res.body.should.have.property("name").and.to.equal(testMajor.name)
        res.body.should.have.property("courses_required").and.to.be.a("Array").and.to.have.lengthOf(0)
        done()
    })
    .catch(function(err) {
      done(err)
    })
  })

  it("should delete major at DELETE /majors/BS_Test", function(done) {
    Major.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .delete("/majors/BS_Test")
          .then(function(res) {
            res.should.have.status(200)
            Major.estimatedDocumentCount()
              .then(function(newDocCount) {
                newDocCount.should.be.equal(initialDocCount - 1)
                done()
              })
              .catch(function(err) {
                done(err)
              })
          })
          .catch(function(err) {
            done(err)
          })
      })
      .catch(function(err) {
        done(err)
      })
  })

  after(function() {
    Major.deleteMany(testMajor)
    Course.deleteMany(testCourse)
  })
})