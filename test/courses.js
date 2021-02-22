const app = require("../server")
const chai = require("chai")
const chaiHttp = require("chai-http")
const expect = chai.expect

const Course = require("../models/course")

chai.should()
chai.use(chaiHttp)

describe("Courses", function() {
  const agent = chai.request.agent(app)
  // Course for Tests
  const testCourse = {
    department: "TST",
    code: "101",
    name: "Introduction to Testing",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    units: "3",
    // prerequisites: "",
    // corequisites: "",
    // postrequisites: ""
  }

  it("should create course with valid attributes at POST /courses/new", function (done) {
    Course.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .post("/courses/new")
          .send(testCourse)
          .then(function (res) {
            Course.estimatedDocumentCount()
              .then(function(newDocCount) {
                expect(res.to.have.status(200))
                expect(newDocCount).to.be.equal(initialDocCount + 1)
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