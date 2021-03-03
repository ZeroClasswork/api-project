const app = require("../server")
const chai = require("chai")
const chaiHttp = require("chai-http")

const Course = require("../src/models/course")
const Major = require("../src/models/major")

chai.should()
chai.use(chaiHttp)

describe("Majors", function() {
  const agent = chai.request.agent(app)
  let testMajor = {
    type: "BS",
    name: "Test"
  }

  before(function() {
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

  // it("should add course to major at POST /majors/BS_Test/add_course")
  // it("should remove course to major at DELETE /majors/BS_Test/add_course")

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

  it("should delete major at DELETE /majors/BS_Test", function(done) {
    Major.estimatedDocumentCount()
      .then(function(initialDocCount) {
        agent
          .delete("/majors/BS_Test")
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
    Major.findOneAndDelete(testMajor)
  })
})