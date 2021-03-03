const app = require("../server")
const chai = require("chai")
const chaiHttp = require("chai-http")

const School = require("../src/models/school")
const Course = require("../src/models/course")
const Major = require("../src/models/major")

chai.should()
chai.use(chaiHttp)

describe("School", function() {
  it("should create school with valid attributes at POST /schools/new")
  it("should receive school attributes at GET /schools/Test_University")
  it("should update school attributes at PATCH /schools/Test_University/edit_name")
  it("should update school attributes at PATCH /schools/Test_University/edit_location")
  it("should update school attributes at PATCH /schools/Test_University")
  it("should update school attributes at PUT /schools/Test_University")
  it("should delete school at DELETE /schools/Test_University")
})