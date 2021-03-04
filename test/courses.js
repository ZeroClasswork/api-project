const app = require("../server")
const chai = require("chai")
const chaiHttp = require("chai-http")

const School = require("../src/models/school")
const Course = require("../src/models/course")

chai.should()
chai.use(chaiHttp)

describe("Courses", function() {
  const agent = chai.request.agent(app)

  // API Key Variable
  let api_key = {
    "Authorization": "Api-Key 7310601efbd0bfae"
  }

  // School for Tests
  let testSchool = {
    name: "Test University",
    city: "Test Francisco",
    state: "North Testkota",
    country: "United Tests of America"
  }

  // Course for Tests
  let testCourse = {
    department: "TST",
    code: "101",
    name: "Introduction to Testing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    units: "3",
  }

  let secondCourse = {
    department: "PSY",
    code: "101",
    name: "Introduction to Psychology",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    units: "3",
  }

  before(function() {
    School.deleteMany(testSchool)
    Course.deleteMany(testCourse)
    Course.deleteMany(secondCourse)

    agent
      .post("/schools/new")
      .set(api_key)
      .send(testSchool)
      .then(function(res) {
        agent
          .post("/schools/Test_University/courses/new")
          .set(api_key)
          .send(secondCourse)
          .catch(function(err) {})
      })
      .catch(function(err) {})
  })

  it("should create course with valid attributes at POST /schools/Test_University/courses/new", function(done) {
    Course.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .post("/schools/Test_University/courses/new")
          .set(api_key)
          .send(testCourse)
          .then(function (res) {
            res.status.should.equal(200)
            res.body.should.be.a("Object")
            Course.estimatedDocumentCount()
              .then(function(newDocCount) {
                newDocCount.should.be.equal(initialDocCount + 2)
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

  it("should receive course attributes at GET /schools/Test_University/courses/TST_101", function(done) {
    agent
      .get("/schools/Test_University/courses/TST_101")
      .set(api_key)
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

  it("should update course attributes at PATCH /schools/Test_University/courses/TST_101/edit_department", function(done) {
    testCourse.department = "TEST"
    agent
      .patch("/schools/Test_University/courses/TST_101/edit_department")
      .set(api_key)
      .send({department: testCourse.department})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/schools/Test_University/courses/TEST_101")
          .set(api_key)
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

  it("should update course attributes at PATCH /schools/Test_University/courses/TEST_101/edit_code", function(done) {
    testCourse.code = "102"
    agent
      .patch("/schools/Test_University/courses/TEST_101/edit_code")
      .set(api_key)
      .send({code: testCourse.code})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/schools/Test_University/courses/TEST_102")
          .set(api_key)
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

  it("should update course attributes at PATCH /schools/Test_University/courses/TEST_102/edit_name", function(done) {
    testCourse.name = "Testing Lab"
    agent
      .patch("/schools/Test_University/courses/TEST_102/edit_name")
      .set(api_key)
      .send({name: testCourse.name})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/schools/Test_University/courses/TEST_102")
          .set(api_key)
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

  it("should update course attributes at PATCH /schools/Test_University/courses/TEST_102/edit_description", function(done) {
    testCourse.description = "Shorter Description"
    agent
      .patch("/schools/Test_University/courses/TEST_102/edit_description")
      .set(api_key)
      .send({description: testCourse.description})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/schools/Test_University/courses/TEST_102")
          .set(api_key)
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

  it("should update course attributes at PATCH /schools/Test_University/courses/TEST_102/edit_units", function(done) {
    testCourse.units = "5"
    agent
      .patch("/schools/Test_University/courses/TEST_102/edit_units")
      .set(api_key)
      .send({units: testCourse.units})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/schools/Test_University/courses/TEST_102")
          .set(api_key)
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

  it("should update course attributes at PUT /schools/Test_University/courses/TEST_102", function(done) {
    testCourse = {
      department: "TST",
      code: "101",
      name: "Introduction to Testing",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      units: "3",
    }

    agent
      .put("/schools/Test_University/courses/TEST_102")
      .set(api_key)
      .send(testCourse)
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        agent
          .get("/schools/Test_University/courses/TST_101")
          .set(api_key)
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

  it("should associate PSY101 to TST101 at PATCH /schools/Test_University/courses/TST_101/add_prerequisite/PSY_101", function(done) {
    agent
      .patch("/schools/Test_University/courses/TST_101/add_prerequisite/PSY_101")
      .set(api_key)
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        res.body.should.have.property("prerequisites").and.to.be.a("Array").and.to.have.lengthOf(1)
        agent
          .get("/schools/Test_University/courses/PSY_101")
          .set(api_key)
          .then(function(res) {
            res.body.should.have.property("department").and.to.equal(secondCourse.department)
            res.body.should.have.property("code").and.to.equal(secondCourse.code)
            res.body.should.have.property("name").and.to.equal(secondCourse.name)
            res.body.should.have.property("description").and.to.equal(secondCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(secondCourse.units))
            res.body.should.have.property("postrequisites").and.to.be.a("Array").and.to.have.lengthOf(1)
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

  it("should disassociate PSY101 to TST101 at PATCH /schools/Test_University/courses/TST_101/delete_prerequisite/PSY_101", function(done) {
    agent
      .post("/schools/Test_University/courses/new")
      .set(api_key)
      .send(secondCourse)
      .then(function(res) {
        agent
          .patch("/schools/Test_University/courses/TST_101/delete_prerequisite/PSY_101")
          .set(api_key)
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("department").and.to.equal(testCourse.department)
            res.body.should.have.property("code").and.to.equal(testCourse.code)
            res.body.should.have.property("name").and.to.equal(testCourse.name)
            res.body.should.have.property("description").and.to.equal(testCourse.description)
            res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
            res.body.should.have.property("prerequisites").and.to.be.a("Array").and.to.have.lengthOf(0)
            agent
              .get("/schools/Test_University/courses/PSY_101")
              .set(api_key)
              .then(function(res) {
                res.body.should.have.property("department").and.to.equal(secondCourse.department)
                res.body.should.have.property("code").and.to.equal(secondCourse.code)
                res.body.should.have.property("name").and.to.equal(secondCourse.name)
                res.body.should.have.property("description").and.to.equal(secondCourse.description)
                res.body.should.have.property("units").and.to.equal(parseFloat(secondCourse.units))
                res.body.should.have.property("postrequisites").and.to.be.a("Array").and.to.have.lengthOf(0)
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

  it("should associate PSY101 to TST101 at PATCH /schools/Test_University/courses/TST_101/add_corequisite/PSY_101", function(done) {
    agent
      .patch("/schools/Test_University/courses/TST_101/add_corequisite/PSY_101")
      .set(api_key)
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        res.body.should.have.property("corequisites").and.to.be.a("Array").and.to.have.lengthOf(1)
        done()
    })
    .catch(function(err) {
      done(err)
    })
  })

  it("should disassociate PSY101 to TST101 at PATCH /schools/Test_University/courses/TST_101/delete_corequisite/PSY_101", function(done) {
    agent
      .patch("/schools/Test_University/courses/TST_101/delete_prerequisite/PSY_101")
      .set(api_key)
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("department").and.to.equal(testCourse.department)
        res.body.should.have.property("code").and.to.equal(testCourse.code)
        res.body.should.have.property("name").and.to.equal(testCourse.name)
        res.body.should.have.property("description").and.to.equal(testCourse.description)
        res.body.should.have.property("units").and.to.equal(parseFloat(testCourse.units))
        res.body.should.have.property("prerequisites").and.to.be.a("Array").and.to.have.lengthOf(0)
        done()
    })
    .catch(function(err) {
      done(err)
    })
  })

  it("should delete course at DELETE /schools/Test_University/courses/TST_101", function(done) {
    Course.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .delete("/schools/Test_University/courses/TST_101")
          .set(api_key)
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
    School.deleteMany(testSchool)
    Course.deleteMany(testCourse)
    Course.deleteMany(secondCourse)
  })
})