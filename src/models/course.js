const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CourseSchema = new Schema({
  department: { type: String, required: true },
  code: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  units: { type: Number, required: true },
  prerequisite: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  corequisite: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  postrequisite: [{ type: Schema.Types.ObjectId, ref: "Course" }],
})

module.exports = mongoose.model("Course", CourseSchema)