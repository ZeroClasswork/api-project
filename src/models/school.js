const mongoose = require("mongoose")
const Schema = mongoose.Schema

const SchoolSchema = new Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  majors: [{ type: Schema.Types.ObjectId, ref: "Major" }],
  courses: [{ type: Schema.Types.ObjectId, ref: "Course" }],
})

module.exports = mongoose.model("School", SchoolSchema)