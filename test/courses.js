const app = require("../server")
const chai = require("chai")
const chaiHttp = require("chai-http")

const Course = require("../src/models/course")

chai.should()
chai.use(chaiHttp)

describe("Courses", function() {
  const agent = chai.request.agent(app)
  // Course for Tests
  let testCourse = {
    department: "TST",
    code: "101",
    name: "Introduction to Testing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    units: "3",
    // prerequisites: "",
    // corequisites: "",
    // postrequisites: ""
  }

  it("should create course with valid attributes at POST /courses/new", function(done) {
    Course.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .post("/courses/new")
          .send(testCourse)
          .then(function (res) {
            res.status.should.equal(200)
            res.body.should.be.a("Object")
            Course.estimatedDocumentCount()
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

  it("should receive course attributes at GET /courses/TST_101", function(done) {
    agent
      .get("/courses/TST_101")
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        done()
      })
      .catch(function(err) {
        done(err)
      })
  })

  it("should update course attributes at PATCH /courses/TST_101/edit_department", function(done) {
    testCourse.department = "TEST"
    agent
      .patch("/courses/TST_101/edit_department")
      .send({department: testCourse.department})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/courses/TEST_101")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("department").and.to.equal(testCourse.department)
            res.body.should.have.property("code").and.to.equal(testCourse.code)
            res.body.should.have.property("name").and.to.equal(testCourse.name)
            res.body.should.have.property("description").and.to.equal(testCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
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


  it("should update course attributes at PATCH /courses/TEST_101/edit_code", function(done) {
    testCourse.code = "102"
    agent
      .patch("/courses/TEST_101/edit_code")
      .send({code: testCourse.code})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/courses/TEST_102")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("department").and.to.equal(testCourse.department)
            res.body.should.have.property("code").and.to.equal(testCourse.code)
            res.body.should.have.property("name").and.to.equal(testCourse.name)
            res.body.should.have.property("description").and.to.equal(testCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
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

  it("should update course attributes at PATCH /courses/TEST_102/edit_name", function(done) {
    testCourse.name = "Testing Lab"
    agent
      .patch("/courses/TEST_102/edit_name")
      .send({name: testCourse.name})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/courses/TEST_102")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("department").and.to.equal(testCourse.department)
            res.body.should.have.property("code").and.to.equal(testCourse.code)
            res.body.should.have.property("name").and.to.equal(testCourse.name)
            res.body.should.have.property("description").and.to.equal(testCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
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

  it("should update course attributes at PATCH /courses/TEST_102/edit_description", function(done) {
    testCourse.description = "Shorter Description"
    agent
      .patch("/courses/TEST_102/edit_description")
      .send({description: testCourse.description})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/courses/TEST_102")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("department").and.to.equal(testCourse.department)
            res.body.should.have.property("code").and.to.equal(testCourse.code)
            res.body.should.have.property("name").and.to.equal(testCourse.name)
            res.body.should.have.property("description").and.to.equal(testCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
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

  it("should update course attributes at PATCH /courses/TEST_102/edit_units", function(done) {
    testCourse.units = "5"
    agent
      .patch("/courses/TEST_102/edit_units")
      .send({units: testCourse.units})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/courses/TEST_102")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("department").and.to.equal(testCourse.department)
            res.body.should.have.property("code").and.to.equal(testCourse.code)
            res.body.should.have.property("name").and.to.equal(testCourse.name)
            res.body.should.have.property("description").and.to.equal(testCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
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

  it("should update course attributes at PUT /courses/TEST_102", function(done) {
    testCourse = {
      department: "TST",
      code: "101",
      name: "Introduction to Testing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      units: "3",
      // prerequisites: "",
      // corequisites: "",
      // postrequisites: ""
    }

    agent
      .put("/courses/TEST_102")
      .send(testCourse)
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/courses/TST_101")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("department").and.to.equal(testCourse.department)
            res.body.should.have.property("code").and.to.equal(testCourse.code)
            res.body.should.have.property("name").and.to.equal(testCourse.name)
            res.body.should.have.property("description").and.to.equal(testCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
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

  it("should delete course at DELETE /courses/TST_101", function(done) {
    Course.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .delete("/courses/TST_101")
          .then(function(res) {
            res.should.have.status(200)
            Course.estimatedDocumentCount()
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
    Course.findOneAndDelete(testCourse)
  })
})