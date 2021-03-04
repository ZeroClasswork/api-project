const app = require("../server")
const chai = require("chai")
const chaiHttp = require("chai-http")

const School = require("../src/models/school")
const Course = require("../src/models/course")
const Major = require("../src/models/major")

chai.should()
chai.use(chaiHttp)

describe("School", function() {
  const agent = chai.request.agent(app)

  // School for Tests
  let testSchool = {
    name: "Test University",
    city: "Test Francisco",
    state: "North Testkota",
    country: "United Tests of America"
  }

  before(function() {
    School.deleteMany(testSchool)
  })

  it("should create school with valid attributes at POST /schools/new", function(done) {
    School.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .post("/schools/new")
          .send(testMajor)
          .then(function (res) {
            res.status.should.equal(200)
            res.body.should.be.a("Object")
            School.estimatedDocumentCount()
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

  it("should receive school attributes at GET /schools/Test_University", function(done) {
    agent
      .get("/schools/Test_University")
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("name").and.to.equal(testSchool.name)
        res.body.should.have.property("city").and.to.equal(testSchool.city)
        res.body.should.have.property("state").and.to.equal(testSchool.state)
        res.body.should.have.property("country").and.to.equal(testSchool.country)
        done()
      })
      .catch(function(err) {
        done(err)
      })
  })

  it("should update school attributes at PATCH /schools/Test_University/edit_name", function(done) {
    testSchool.name = "Test College"
    agent
      .patch("/schools/Test_University/edit_name")
      .send({name: testSchool.name})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("name").and.to.equal(testSchool.name)
        res.body.should.have.property("city").and.to.equal(testSchool.city)
        res.body.should.have.property("state").and.to.equal(testSchool.state)
        res.body.should.have.property("country").and.to.equal(testSchool.country)
        agent
          .get("/schools/Test_College")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("name").and.to.equal(testSchool.name)
            res.body.should.have.property("city").and.to.equal(testSchool.city)
            res.body.should.have.property("state").and.to.equal(testSchool.state)
            res.body.should.have.property("country").and.to.equal(testSchool.country)
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

  it("should update school attributes at PATCH /schools/Test_College/edit_city", function(done) {
    testSchool.city = "Santa Testia"
    agent
      .patch("/schools/Test_College/edit_city")
      .send({city: testSchool.city})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("name").and.to.equal(testSchool.name)
        res.body.should.have.property("city").and.to.equal(testSchool.city)
        res.body.should.have.property("state").and.to.equal(testSchool.state)
        res.body.should.have.property("country").and.to.equal(testSchool.country)
        agent
          .get("/schools/Test_College")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("name").and.to.equal(testSchool.name)
            res.body.should.have.property("city").and.to.equal(testSchool.city)
            res.body.should.have.property("state").and.to.equal(testSchool.state)
            res.body.should.have.property("country").and.to.equal(testSchool.country)
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

  it("should update school attributes at PATCH /schools/Test_College/edit_state", function(done) {
    testSchool.state = "Testconsin"
    agent
      .patch("/schools/Test_College/edit_state")
      .send({state: testSchool.state})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("name").and.to.equal(testSchool.name)
        res.body.should.have.property("city").and.to.equal(testSchool.city)
        res.body.should.have.property("state").and.to.equal(testSchool.state)
        res.body.should.have.property("country").and.to.equal(testSchool.country)
        agent
          .get("/schools/Test_College")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("name").and.to.equal(testSchool.name)
            res.body.should.have.property("city").and.to.equal(testSchool.city)
            res.body.should.have.property("state").and.to.equal(testSchool.state)
            res.body.should.have.property("country").and.to.equal(testSchool.country)
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

  it("should update school attributes at PATCH /schools/Test_College/edit_country", function(done) {
    testSchool.country = "Mexitest"
    agent
      .patch("/schools/Test_College/edit_country")
      .send({country: testSchool.country})
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("name").and.to.equal(testSchool.name)
        res.body.should.have.property("city").and.to.equal(testSchool.city)
        res.body.should.have.property("state").and.to.equal(testSchool.state)
        res.body.should.have.property("country").and.to.equal(testSchool.country)
        agent
          .get("/schools/Test_College")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("name").and.to.equal(testSchool.name)
            res.body.should.have.property("city").and.to.equal(testSchool.city)
            res.body.should.have.property("state").and.to.equal(testSchool.state)
            res.body.should.have.property("country").and.to.equal(testSchool.country)
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

  it("should update school attributes at PUT /schools/Test_College", function(done) {
    let testSchool = {
      name: "Test University",
      city: "Test Francisco",
      state: "North Testkota",
      country: "United Tests of America"
    }

    agent
      .put("/schools/Test_College")
      .send(testSchool)
      .then(function(res) {
        res.status.should.equal(200)
        res.body.should.have.property("name").and.to.equal(testSchool.name)
        res.body.should.have.property("city").and.to.equal(testSchool.city)
        res.body.should.have.property("state").and.to.equal(testSchool.state)
        res.body.should.have.property("country").and.to.equal(testSchool.country)
        agent
          .get("/schools/Test_University")
          .then(function(res) {
            res.status.should.equal(200)
            res.body.should.have.property("name").and.to.equal(testSchool.name)
            res.body.should.have.property("city").and.to.equal(testSchool.city)
            res.body.should.have.property("state").and.to.equal(testSchool.state)
            res.body.should.have.property("country").and.to.equal(testSchool.country)
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

  it("should delete school at DELETE /schools/Test_University", function(done) {
    School.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .delete("/schools/Test_University")
          .then(function(res) {
            res.should.have.status(200)
            School.estimatedDocumentCount()
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
  })
})